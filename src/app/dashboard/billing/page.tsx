import { getCurrentUser } from "@/lib/auth";
import { BillingView } from "@/components/dashboard/views/BillingView";

export default async function BillingPage() {
  const user = await getCurrentUser();
  return <BillingView user={user} />;
}
