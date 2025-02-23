import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../testUtils";
import { createServer } from "../../createServer";
import { DynamicForm } from "../DynamicForm";

describe("Random Component", () => {
  createServer({
    path: "http://localhost:3000/students",
    data: [
      {
        id: "5d66cb32-1e8c-43f3-a20a-7b06262cc637",
        name: "eve",
        age: "98",
        height: 27,
        skills: ["second_value", "first_value"],
        gender: "Female",
        fruit: "a_value",
      },
    ],
    method: "get",
  });

  it("renders correctly", async () => {
    renderWithProviders(<DynamicForm />);
    const forms = await screen.findAllByTestId("student-form");
    expect(forms.length).toBeGreaterThan(0); // Verifies that there is at least one form
    expect(forms[0]).toBeInTheDocument(); // Verifies that the first form is in the document
  });

  it("submit button", async () => {
    renderWithProviders(<DynamicForm />);
    const submit = await screen.findByTestId("submit-button");
    await fireEvent.click(submit);
  });
});

describe("Random Component error", () => {
  try {
    createServer({
      path: "http://localhost:3000/students",
      data: [],
      method: "get",
      throw404: true,
    });
  } catch (e: any) {
    screen.debug(e);
  }

  it("error", async () => {
    renderWithProviders(<DynamicForm />);
  });
});

describe("Random Component", () => {
  createServer({
    path: "http://localhost:3000/students/5d66cb32-1e8c-43f3-a20a-7b06262cc637",
    data: [
      {
        id: "5d66cb32-1e8c-43f3-a20a-7b06262cc637",
        name: "eve",
        age: "98",
        height: 27,
        skills: ["second_value", "first_value"],
        gender: "Female",
        fruit: "a_value",
      },
    ],
    method: "get",
  });

  it("submit button", async () => {
    renderWithProviders(<DynamicForm />);
    const submit = await screen.findByTestId("submit-button");
    await fireEvent.click(submit);
  });
});

describe("Random Component", () => {
  createServer({
    path: "http://localhost:3000/students/5d66cb32-1e8c-43f3-a20a-7b06262cc637",
    data: [],
    method: "get",
    throw404: true,
  });

  it("submit button", async () => {
    renderWithProviders(<DynamicForm />);
    let text = await screen.findAllByRole("button");
    await fireEvent.click(text[0]);
    expect(await screen.findByText("ERROR")).toBeInTheDocument();
  });
});
