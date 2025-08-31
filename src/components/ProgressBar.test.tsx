import { render, screen } from "@testing-library/react";
import ProgressSummary from "./ProgressSummary";

describe("<ProgressSumary />", () => {
  it("should render the summary with partial progress", () => {
    const props = {
      completedCount: 25,
      totalCount: 100,
      totalSaved: 1250,
      totalGoal: 5050, // Soma de 1 a 100
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );
    expect(screen.getByText(/R\$\s*1\.250,00/i)).toBeInTheDocument();
    expect(screen.getByText(/de R\$\s*5\.050,00/i)).toBeInTheDocument();
    expect(screen.getByTestId("deposit-counts")).toHaveTextContent(
      "25/100 depósitos"
    );

    const progressBar = screen.getByRole("progressBar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "1250");
    expect(progressBar).toHaveAttribute("aria-valuemax", "5050");

    const progressBarFill = progressBar.firstChild as HTMLElement;
    expect(progressBarFill).toHaveStyle(`width: ${progressPercentage}%`);
  });

  it("should render correctly for a challenge at 0% progress", () => {
    const props = {
      completedCount: 0,
      totalCount: 200,
      totalSaved: 0,
      totalGoal: 20100,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );

    expect(screen.getByText(/R\$\s*0,00/i)).toBeInTheDocument();
    expect(screen.getByTestId("deposit-counts")).toHaveTextContent(
      "0/200 depósitos"
    );

    const progressBarFill = screen.getByRole("progressBar")
      .firstChild as HTMLElement;
    expect(progressBarFill).toHaveStyle("width: 0%");
  });

  it("should render correctly for a completed challenge at 100%", () => {
    const props = {
      completedCount: 50,
      totalCount: 50,
      totalSaved: 1275,
      totalGoal: 1275,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );

    const totalSavedElement = screen.getByTestId("total-saved");
    const totalGoalElement = screen.getByTestId("total-goal");
    expect(totalSavedElement).toHaveTextContent("R$ 1.275,00");
    expect(totalGoalElement).toHaveTextContent("de R$ 1.275,00");
    expect(screen.getByTestId("deposit-counts")).toHaveTextContent(
      "50/50 depósitos"
    );

    const progressBarFill = screen.getByRole("progressBar")
      .firstChild as HTMLElement;
    expect(progressBarFill).toHaveStyle("width: 100%");
  });

  it("should handle a totalGoal of 0 to avoid division by zero", () => {
    const props = {
      completedCount: 0,
      totalCount: 0,
      totalSaved: 0,
      totalGoal: 0,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );
    const progressBarFill = screen.getByRole("progressBar");
    expect(progressBarFill).toHaveAttribute("aria-valuenow", "0");
    expect(progressBarFill).toHaveAttribute("aria-valuemax", "0");
  });

  it("should handle floating-point numbers correctly", () => {
    const props = {
      completedCount: 1,
      totalCount: 2,
      totalSaved: 150.75,
      totalGoal: 301.5,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );
    expect(screen.getByTestId("total-saved")).toHaveTextContent("R$ 150,75");
    expect(screen.getByTestId("total-goal")).toHaveTextContent("de R$ 301,50");
    const progressBarFill = screen.getByRole("progressBar")
      .firstChild as HTMLElement;
    expect(progressBarFill).toHaveStyle("width: 50%");
  });

  it("should cap the progress bar at 100% even if saved amount exceeds goal", () => {
    const props = {
      completedCount: 10,
      totalCount: 5,
      totalSaved: 2000,
      totalGoal: 1000,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );

    expect(screen.getByTestId("total-saved")).toHaveTextContent("R$ 2.000,00");
    expect(screen.getByTestId("total-goal")).toHaveTextContent(
      "de R$ 1.000,00"
    );

    const progressBarFill = screen.getByRole("progressBar")
      .firstChild as HTMLElement;
    expect(progressBarFill).toHaveStyle("width: 100%");
  });

  it("should update correctly when props change", () => {
    const initialProps = {
      completedCount: 50,
      totalCount: 100,
      totalSaved: 500,
      totalGoal: 1000,
    };
    const progressPercentageInitial =
      (initialProps.totalSaved / initialProps.totalGoal) * 100;
    const { rerender } = render(
      <ProgressSummary
        progressPercentage={progressPercentageInitial}
        {...initialProps}
      />
    );
    expect(screen.getByTestId("total-saved")).toHaveTextContent("R$ 500,00");
    expect(
      screen.getByRole("progressBar").firstChild as HTMLElement
    ).toHaveStyle("width: 50%");

    const updatedProps = {
      ...initialProps,
      completedCount: 75,
      totalSaved: 750,
    };
    const progressPercentageUpdated =
      (updatedProps.totalSaved / updatedProps.totalGoal) * 100;
    rerender(
      <ProgressSummary
        progressPercentage={progressPercentageUpdated}
        {...updatedProps}
      />
    );
    expect(screen.getByTestId("total-saved")).toHaveTextContent("R$ 750,00");
    expect(
      screen.getByRole("progressBar").firstChild as HTMLElement
    ).toHaveStyle("width: 75%");
  });

  it("should match the snapshot for a typical progress state", () => {
    const props = {
      completedCount: 25,
      totalCount: 100,
      totalSaved: 1250,
      totalGoal: 5050,
    };
    const progressPercentage = (props.totalSaved / props.totalGoal) * 100;
    const { container } = render(
      <ProgressSummary progressPercentage={progressPercentage} {...props} />
    );

    expect(container).toMatchSnapshot();
  });
});
