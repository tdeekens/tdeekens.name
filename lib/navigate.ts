/** Full page navigation; a module of its own so tests can replace it. */
export function navigate(path: string) {
  window.location.assign(path);
}
