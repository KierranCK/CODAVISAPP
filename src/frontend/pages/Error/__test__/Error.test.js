import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Error from "../Error";

//function to render component to be tested
const renderComponent = () =>
  render(<Error />, {
    wrapper: BrowserRouter,
  });

//object containing all elements to be tested
const elements = {
  heading: () => screen.getByRole("heading"),
  button: () => screen.getByRole("button"),
};

//function to render component before each test
beforeEach(() => {
  renderComponent();
});

//function cleanup after each test
afterEach(() => {
  cleanup();
});

//test suite
describe("Error Tests", () => {
  test("Ensure Error has not inadvertently changed", () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('Ensure heading and "Dashboard" button rendered', () => {
    expect(elements.heading()).toHaveTextContent("404");
    expect(elements.button()).toBeInTheDocument();
    expect(elements.button()).toHaveTextContent("Dashboard");
    expect(elements.button()).not.toBeDisabled();
  });
});
