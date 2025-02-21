import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Random } from "../Random";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../testUtils";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([
      { id: 1, name: "john" },
      { id: 2, name: "cindy" },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("Random Component", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Random />);

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    screen.debug(listItems);
  });

  it("error", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", async () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<Random />);
    const errorMessage = await screen.findByText(/error/i); // Adjust this text based on your actual UI
    expect(errorMessage).toBeInTheDocument();
  });
});
