export async function sendAudit(event: string, payload?: any): Promise<void> {
  // Mock audit sender to .NET microservice. Non-blocking and must not break main flow.
  setTimeout(() => {
    try {
      console.info(`[AUDIT] event=${event} payload=${JSON.stringify(payload)}`);
    } catch (e) {
      console.error("Audit logging error", e);
    }
  }, 0);
}
