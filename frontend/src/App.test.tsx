import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Search from "./Components/Search";
import user from "@testing-library/user-event";

describe("React Testing Examples", () => {
  test("Finds Search Button", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Search");
  });

  test("When Search Button is clicked onClickHandler is called", async () => {
    const onClickHandler = jest.fn();
    const dummyArray: { success: string; payload: [] } = {
      success: "true",
      payload: [],
    };
    render(
      <Search distinctUsers={dummyArray} onClickHandler={onClickHandler} />
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Search");
    user.click(buttonElement);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  test("Header says Birdie Care Dashboard", async () => {
    render(<App />);
    const header = screen.getByText("Birdie Care Dashboard");
    expect(header).toHaveTextContent("Birdie Care Dashboard");
  });

  test("Dropdown for care recipient says please select a care recipient", async () => {
    render(<App />);
    const dropdown = screen.getByTestId("select");
    expect(dropdown).toHaveTextContent("Please Select a Care Recipient");
  });
});
