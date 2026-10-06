import "@testing-library/jest-dom";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(private readonly callback: IntersectionObserverCallback) {
    observers.push({ observer: this, callback });
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

type ObserverRecord = {
  observer: MockIntersectionObserver;
  callback: IntersectionObserverCallback;
};

const observers: ObserverRecord[] = [];

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

if (typeof globalThis.fetch !== "function") {
  Object.defineProperty(globalThis, "fetch", {
    writable: true,
    configurable: true,
    value: jest.fn(),
  });
}

if (typeof globalThis.Response === "undefined") {
  Object.defineProperty(globalThis, "Response", {
    writable: true,
    configurable: true,
    value: class Response {
      body: string;
      status: number;
      ok: boolean;

      constructor(body = "", init: { status?: number } = {}) {
        this.body = String(body);
        this.status = init.status ?? 200;
        this.ok = this.status >= 200 && this.status < 300;
      }

      async json() {
        return this.body ? JSON.parse(this.body) : null;
      }
    },
  });
}

afterEach(() => {
  observers.length = 0;
  jest.restoreAllMocks();
});
