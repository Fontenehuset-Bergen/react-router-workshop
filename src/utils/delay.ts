/**
 * We can use this function to simulate a response delay from an API
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
