import { act, renderHook } from "@testing-library/react";
import { prefersReducedMotion, supportsViewTimeline, useInView } from "./useInView";

type ObserverCall = {
  callback: IntersectionObserverCallback;
  observe: jest.Mock;
  disconnect: jest.Mock;
};

const observerCalls: ObserverCall[] = [];

beforeEach(() => {
  observerCalls.length = 0;

  class RecordingObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0];
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    constructor(callback: IntersectionObserverCallback) {
      observerCalls.push({
        callback,
        observe: this.observe,
        disconnect: this.disconnect,
      });
    }
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: RecordingObserver,
  });
});

describe("useInView", () => {
  it("reports in-view when the observed node intersects", () => {
    const { result } = renderHook(() => useInView());
    const node = document.createElement("div");

    act(() => {
      result.current[0](node);
    });

    expect(observerCalls).toHaveLength(1);
    expect(observerCalls[0]?.observe).toHaveBeenCalledWith(node);
    expect(result.current[1]).toBe(false);

    act(() => {
      observerCalls[0]?.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current[1]).toBe(true);
    expect(observerCalls[0]?.disconnect).toHaveBeenCalled();
  });

  it("does not disconnect when once is false and the node leaves view", () => {
    const { result } = renderHook(() => useInView({ once: false }));
    const node = document.createElement("div");

    act(() => {
      result.current[0](node);
    });

    act(() => {
      observerCalls[0]?.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(result.current[1]).toBe(true);

    act(() => {
      observerCalls[0]?.callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(result.current[1]).toBe(false);
    expect(observerCalls[0]?.disconnect).not.toHaveBeenCalled();
  });
});

describe("feature detection helpers", () => {
  it("reports view-timeline support from CSS.supports", () => {
    const supports = jest.fn((query: string) => query === "animation-timeline: view()");
    Object.defineProperty(window, "CSS", {
      configurable: true,
      value: { supports },
    });

    expect(supportsViewTimeline()).toBe(true);
    expect(supports).toHaveBeenCalledWith("-moz-orient: inline");
    expect(supports).toHaveBeenCalledWith("animation-timeline: view()");
  });

  it("does not use view timelines in Firefox", () => {
    const supports = jest.fn().mockReturnValue(true);
    Object.defineProperty(window, "CSS", {
      configurable: true,
      value: { supports },
    });

    expect(supportsViewTimeline()).toBe(false);
    expect(supports).toHaveBeenCalledWith("-moz-orient: inline");
  });

  it("reads the reduced-motion media query", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        media: "(prefers-reduced-motion: reduce)",
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
        onchange: null,
      }),
    });

    expect(prefersReducedMotion()).toBe(true);
  });
});
