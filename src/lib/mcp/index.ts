import { defineMcp } from "@lovable.dev/mcp-js";
import submitFamilyInterest from "./tools/submit-family-interest";
import getPlatformInfo from "./tools/get-platform-info";

export default defineMcp({
  name: "tomtebudet-mcp",
  title: "Tomtebudet",
  version: "0.1.0",
  instructions:
    "Tools for Tomtebudet, a Swedish platform for booking verified Santas. Use `get_platform_info` for an overview of the platform and its current pre-launch status. Use `submit_family_interest` to add a family to the interest list so they are notified when Christmas 2026 bookings open.",
  tools: [getPlatformInfo, submitFamilyInterest],
});
