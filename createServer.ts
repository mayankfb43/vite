import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { beforeAll, afterEach, afterAll } from "vitest";

export function createServer(handlerConfig: {
  path: string;
  data: Object;
  method: "get" | "post" | "put" | "patch" | "delete";
  throw404?: boolean;
}) {
  const handlers = [
    http[handlerConfig.method](handlerConfig.path, () => {
      if (handlerConfig.throw404) {
        return HttpResponse.json(
          { message: "Not Found" }, // JSON body for 404 response
          { status: 404 } // Properly setting the status
        );
      }
      return HttpResponse.json(handlerConfig.data);
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
}
