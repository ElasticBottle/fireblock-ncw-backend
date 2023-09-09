export function stubAuth(id: string) {
  return { payload: { sub: id } };
}
