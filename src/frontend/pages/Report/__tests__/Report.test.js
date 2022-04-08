import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Report from "../Report";

const country1 = "Australia";
const country2 = "Aruba";

const COUNTRIES = ["Australia", "Aruba"];

const server = setupServer(
  rest.get("/countries", (req, res, ctx) => {
    return res(ctx.json({ items: COUNTRIES }));
  })
);

//function to render component to be tested
const renderComponent = () => {
  render(<Report />, {
    wrapper: BrowserRouter,
  });
};

//object containing all elements to be tested
const elements = {
  heading: () => screen.getByRole("heading"),
  button: () => screen.getByRole("button"),
  selectCountry: () => {
    fireEvent.click(elements.button());
  },
};

beforeAll(() => {
  server.listen();
});

//function to render component before each test
beforeEach(() => {
  renderComponent();
});

//function cleanup after each test
afterEach(() => {
  cleanup();
});

afterAll(() => {
  server.close();
});

//test suite
describe("Report Tests", () => {
  test("Ensure Report has not inadvertently changed", () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('Ensure heading and "Select Country" button rendered', () => {
    expect(elements.heading()).toHaveTextContent("Report");
    expect(elements.button()).toBeInTheDocument();
    expect(elements.button()).toHaveTextContent("Select Country");
    expect(elements.button()).not.toBeDisabled();
  });
});
