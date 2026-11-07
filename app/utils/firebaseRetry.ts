export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries - 1) break;
      await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
    }
  }

  throw lastError ?? new Error("Failed after retries");
}
