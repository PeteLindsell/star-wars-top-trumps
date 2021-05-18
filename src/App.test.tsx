import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("displays title", () => {
  const title = "Star Wars Top Trumps";
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent(title);
});
