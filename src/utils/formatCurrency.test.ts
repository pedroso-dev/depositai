import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("should format a number into BRL currency string", () => {
    const value = 1234.56;
    const result = formatCurrency(value);
    expect(result).toContain("R$ 1.234,56");
  });

  it("should handle zero value", () => {
    const value = 0;
    const result = formatCurrency(value);
    expect(result).toContain("R$ 0,00");
  });
});
