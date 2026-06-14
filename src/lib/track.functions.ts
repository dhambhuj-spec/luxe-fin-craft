import { createServerFn } from "@tanstack/react-start";

export type TrackedLead = {
  id: string;
  name: string;
  phone: string;
  product: string | null;
  amount: string | null;
  loan_amount: number | null;
  interest_rate: number | null;
  tenure_years: number | null;
  stage: string;
  query_note: string | null;
  rejection_reason: string | null;
  created_at: string;
};

export const trackByPhone = createServerFn({ method: "POST" })
  .inputValidator((input: { phone: string }) => {
    const digits = (input.phone || "").replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) throw new Error("Enter a valid 10-digit phone number");
    return { phone: digits };
  })
  .handler(async ({ data }): Promise<TrackedLead[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("leads")
      .select("id,name,phone,product,amount,loan_amount,interest_rate,tenure_years,stage,query_note,rejection_reason,created_at")
      .ilike("phone", `%${data.phone}%`)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as TrackedLead[];
  });