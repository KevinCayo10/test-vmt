export async function notifyClient(
  method: "email" | "sms",
  to: string,
  subject: string,
  body: string,
): Promise<void> {
  // Mock notification - non-blocking
  setTimeout(() => {
    console.info(
      `[NOTIFY][${method}] to=${to} subject=${subject} body=${body}`,
    );
  }, 0);
}
