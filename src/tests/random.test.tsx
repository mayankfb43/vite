import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Random } from "../Random";
import { renderWithProviders } from "../../testUtils";
import { createServer } from "../../createServer";

describe("Random Component", () => {
  createServer({
    path: "https://jsonplaceholder.typicode.com/users",
    data: [
      { id: 1, name: "john" },
      { id: 2, name: "cindy" },
    ],
    method: "get",
  });

  it("renders correctly", async () => {
    renderWithProviders(<Random />);

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    screen.debug(listItems);
  });
});

describe("Random Component", () => {
  try {
    createServer({
      path: "https://jsonplaceholder.typicode.com/users",
      data: [
        { id: 1, name: "john" },
        { id: 2, name: "cindy" },
      ],
      method: "get",
      throw404: true,
    });
  } catch (e: any) {
    screen.debug(e);
  }

  it("error", async () => {
    renderWithProviders(<Random />);
    const errorMessage = await screen.findByText(/error/i); // Adjust this text based on your actual UI
    expect(errorMessage).toBeInTheDocument();
  });
});
