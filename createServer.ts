import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { beforeAll, afterEach, afterAll } from "vitest";

export function createServer(handlerConfig: {
  path: string;
  data: Object;
  method: "get" | "post";
  throw404?: boolean;
}) {
  const handlers = [
    http[handlerConfig.method](handlerConfig.path, () => {
      if (handlerConfig.throw404) {
        return new HttpResponse(null, { status: 404, statusText: "Not Found" });
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
