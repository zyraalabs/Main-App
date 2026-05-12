import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

const inputClass =
  "w-full px-3 py-[9px] rounded-[6px] bg-bg-input border border-border-mid text-[13px] text-foreground placeholder:text-fg-subtle focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(217,114,24,0.10)] transition-all";

const labelClass = "block text-[12px] font-medium text-muted-foreground mb-1.5";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const nameParts = user.name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");
  const username = user.email.split("@")[0];

  return (
    <div className="py-7 px-8 max-w-xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Profile</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Update your personal information.
        </p>
      </div>

      <div className="bg-card border border-border rounded-[10px] p-6 mb-4">
        <h2 className="text-[13px] font-semibold mb-0.5">
          Personal Information
        </h2>
        <p className="text-[12px] text-muted-foreground mb-5">
          This is how you appear across Zyraa.
        </p>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first-name" className={labelClass}>
                First name
              </label>
              <input
                id="first-name"
                type="text"
                defaultValue={firstName}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="last-name" className={labelClass}>
                Last name
              </label>
              <input
                id="last-name"
                type="text"
                defaultValue={lastName}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              type="text"
              defaultValue={username}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={user.email}
              disabled
              className={`${inputClass} opacity-50 cursor-not-allowed`}
            />
          </div>
          <Button type="submit" variant="brand" size="sm">
            Save changes
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-[10px] p-6">
        <h2 className="text-[13px] font-semibold text-destructive mb-0.5">
          Danger Zone
        </h2>
        <p className="text-[12px] text-muted-foreground mb-4">
          Permanently delete your account and all build history. This cannot be
          undone.
        </p>
        <Button variant="destructive" size="sm">
          Delete my account
        </Button>
      </div>
    </div>
  );
}
