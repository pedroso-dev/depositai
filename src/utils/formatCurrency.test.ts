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

  it("should handle negative values", () => {
    const value = -1234.56;
    const result = formatCurrency(value);
    expect(result).toContain("-R$ 1.234,56");
  });

  it("should handle large values", () => {
    const value = 1234567890.12;
    const result = formatCurrency(value);
    expect(result).toContain("R$ 1.234.567.890,12");
  });

  it("should round numbers with more than two decimal places correctly", () => {
    const valueBigger = 123.456;
    const resultBigger = formatCurrency(valueBigger);
    expect(resultBigger).toContain("R$ 123,46");
    const valueSmaller = 99.994;
    const resultSmaller = formatCurrency(valueSmaller);
    expect(resultSmaller).toContain("R$ 99,99");
  });

  it("shoul pad numbers with one decimal place", () => {
    const value = 123.4;
    const result = formatCurrency(value);
    expect(result).toContain("R$ 123,40");
  });

  it("shold handle NaN", () => {
    const result = formatCurrency(NaN);
    expect(result).toContain("NaN");
  });
});
