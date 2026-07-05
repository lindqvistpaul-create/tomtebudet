import { defineTool } from "@lovable.dev/mcp-js";

const INFO = `Tomtebudet is a Swedish platform for booking verified Santas ("jultomtar") for home visits at Christmas.

Status: Pre-launch. Bookings open for Christmas 2026.
Website: https://tomtebudet.se

What families can do today:
- Join the interest list at https://tomtebudet.se/intresse-familj to be notified when bookings open.

What Santas can do today:
- Apply to become a verified Santa at https://tomtebudet.se/bli-tomte.

Key pages:
- How it works: /sa-funkar-det
- Privacy & security: /integritet-sakerhet
- Terms: /kopvillkor
- Contact: /kontakt`;

export default defineTool({
  name: "get_platform_info",
  title: "Get Tomtebudet info",
  description:
    "Get an overview of Tomtebudet: what the platform is, current pre-launch status, and how families and Santas can get involved before Christmas 2026 bookings open.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({ content: [{ type: "text", text: INFO }] }),
});
