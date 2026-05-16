import { getCurrentUser } from "@/lib/auth";
import { ProfileView } from "@/components/dashboard/views/ProfileView";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return <ProfileView user={user} />;
}
