import { IncomingHttpHeaders } from "http";

export function stubAuth(headers: IncomingHttpHeaders) {
  const authHeader = headers.authorization;
  const id = authHeader?.split(" ")[1];
  return { payload: { sub: id } };
}
