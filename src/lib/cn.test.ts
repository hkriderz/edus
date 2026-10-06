import { cn } from "./cn";

describe("cn", () => {
  it("joins defined class names and drops empty values", () => {
    expect(cn("block", undefined, false, "", "text-ink")).toBe("block text-ink");
  });
});
