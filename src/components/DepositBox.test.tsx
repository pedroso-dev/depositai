import { render, screen, fireEvent } from "@testing-library/react";
import DepositBox from "./DepositBox";

describe("<DepositBox />", () => {
  it("should render the correct value", () => {
    render(<DepositBox value={8} isCompleted={false} onClick={() => {}} />);
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("should render the value 0", () => {
    render(<DepositBox value={0} isCompleted={false} onClick={() => {}} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should have the completed style when isCompleted is true", () => {
    const { container } = render(
      <DepositBox value={8} isCompleted={true} onClick={() => {}} />
    );
    expect(container.firstChild).toHaveClass(
      "border-green-500 bg-green-500 text-white"
    );
    expect(container.firstChild).not.toHaveClass(
      "border-gray-400 bg-gray-700 text-white hover:border-green-400 hover:bg-gray-600"
    );
  });

  it("should call the onClick handler with the correct value when clicked", () => {
    const handleClickMock = jest.fn();
    render(
      <DepositBox value={8} isCompleted={false} onClick={handleClickMock} />
    );
    fireEvent.click(screen.getByText("8"));
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(8);
  });

  it("should not throw an error when clicked without an onCLick prop", () => {
    render(<DepositBox value={8} isCompleted={false} />);
    const box = screen.getByText("8");
    expect(() => {
      fireEvent.click(box);
    }).not.toThrow();
  });

  it("should have an button role and an accessible name for screen readers", () => {
    render(<DepositBox value={8} isCompleted={false} onClick={() => {}} />);
    const button = screen.getByRole("button", {
      name: /Depósito número 8, status: pendente/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should have an accessible name reflecting the completed stage", () => {
    render(<DepositBox value={8} isCompleted={true} onClick={() => {}} />);
    const button = screen.getByRole("button", {
      name: /Depósito número 8, status: concluído/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should be clickble with the Enter Key", () => {
    const handleClickMock = jest.fn();
    render(
      <DepositBox value={8} isCompleted={false} onClick={handleClickMock} />
    );
    const box = screen.getByRole("button");
    fireEvent.keyDown(box, { key: "Enter", code: "Enter" });
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(8);
  });

  it("should be clickble with the Space Key", () => {
    const handleClickMock = jest.fn();
    render(
      <DepositBox value={8} isCompleted={false} onClick={handleClickMock} />
    );
    const box = screen.getByRole("button");
    fireEvent.keyDown(box, { key: " ", code: "Space" });
    expect(handleClickMock).toHaveBeenCalledTimes(1);
    expect(handleClickMock).toHaveBeenCalledWith(8);
  });
});
