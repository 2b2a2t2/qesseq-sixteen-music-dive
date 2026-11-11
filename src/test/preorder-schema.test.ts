import { describe, expect, it } from "vitest";
import { preorderSchema } from "@/lib/preorder-schema";

describe("pre-order sign-up rules", () => {
  it("requires a valid email", () => {
    expect(preorderSchema.safeParse({ email: "not-an-email", locale: "en" }).success).toBe(false);
    expect(preorderSchema.safeParse({ email: "", locale: "en" }).success).toBe(false);
  });

  it("accepts an email alone, with optional fields stored as empty", () => {
    const r = preorderSchema.parse({ email: "  Diver@Example.com ", name: "", locale: "fr" });
    expect(r).toEqual({ email: "diver@example.com", name: null, country: null, message: null, locale: "fr" });
  });

  it("only accepts English or French", () => {
    expect(preorderSchema.safeParse({ email: "a@b.co", locale: "de" }).success).toBe(false);
  });
});
