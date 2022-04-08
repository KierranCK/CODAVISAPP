import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Launchpad from "../Launchpad";

//function to render component to be tested
const renderComponent = () =>
  render(<Launchpad />, {
    wrapper: BrowserRouter,
  });

//object containing all elements to be tested
const elements = {
  heading: () => screen.getByRole("heading"),
  button: () => screen.getByRole("button"),
  image: () => screen.getByRole("img"),
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
describe("Launchpad Tests", () => {
  test("Ensure Launchpad has not inadvertently changed", () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('Ensure Title, image and "Launch" button rendered', () => {
    expect(elements.heading()).toHaveTextContent("COVID");
    expect(elements.button()).toBeInTheDocument();
    expect(elements.button()).toHaveTextContent("Launch");
    expect(elements.button()).not.toBeDisabled();
    expect(elements.image()).toBeInTheDocument();
  });
});
