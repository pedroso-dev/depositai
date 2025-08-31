import { render, screen, fireEvent } from "@testing-library/react";
import DepositBox from "./DepositBox";

describe("<DepositBox />", () => {
  it("should render the correct value", () => {
    render(<DepositBox value={8} isCompleted={false} onClick={() => {}} />);
    expect(screen.getByText("8")).toBeInTheDocument();
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
});
