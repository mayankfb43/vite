import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../testUtils";
import { createServer } from "../../createServer";
import { DynamicForm } from "../DynamicForm";
import { AlchemyProvider } from "@m/alchemy-ui/AlchemyProvider";

describe("Random Component", () => {
  createServer({
    path: "https://jsonplaceholder.typicode.com/students",
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
    renderWithProviders(
      <AlchemyProvider>
        <div id="root">
          <DynamicForm />
        </div>
      </AlchemyProvider>
    );
    const forms = await screen.findByTestId("student-form");
    expect(forms).toHaveLength(1);
  });
});
