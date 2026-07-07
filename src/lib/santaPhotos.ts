import { supabase } from "@/integrations/supabase/client";

/**
 * Resolve a value stored in a santa photo column (portrait/costume) to a
 * browsable URL. New values are storage paths in the PUBLIC `santa-photos`
 * bucket; legacy rows may contain full URLs which are used as-is.
 */
export const resolvePublicPhotoUrl = (
  value: string | null | undefined
): string | null => {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  const { data } = supabase.storage.from("santa-photos").getPublicUrl(value);
  return data.publicUrl || null;
};
