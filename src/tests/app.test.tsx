import { describe, it } from "vitest";
import { renderWithProviders } from "../../testUtils";
import { App } from "../DynamicForm";

describe("abc", () => {
  it("app r", () => {
    renderWithProviders(<App />);
  });
});
