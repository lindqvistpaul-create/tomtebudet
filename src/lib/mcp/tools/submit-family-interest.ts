import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_family_interest",
  title: "Submit family interest",
  description:
    "Add a family to the Tomtebudet interest list. Families are notified when Christmas 2026 bookings open. Requires email and name; location and children info are optional.",
  inputSchema: {
    email: z.string().email().describe("Family contact email (required)."),
    name: z.string().min(1).max(100).describe("Family/contact name (required)."),
    location: z
      .string()
      .max(100)
      .optional()
      .describe("City or area in Sweden, optional."),
    children_info: z
      .string()
      .max(500)
      .optional()
      .describe("Optional info about the children (ages, names)."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async ({ email, name, location, children_info }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return {
        content: [{ type: "text", text: "Server not configured." }],
        isError: true,
      };
    }
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("family_interest").insert({
      email,
      name,
      location: location ?? null,
      children_info: children_info ?? null,
    });
    if (error) {
      return {
        content: [{ type: "text", text: `Could not save: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `Thanks ${name}! You're on the Tomtebudet interest list. We'll email ${email} when bookings for Christmas 2026 open.`,
        },
      ],
      structuredContent: { ok: true, email, name },
    };
  },
});
