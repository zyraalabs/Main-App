import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

const inputClass =
  "w-full h-9 px-3.5 rounded-lg bg-input border border-border text-[13.5px] text-foreground placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-[rgba(217,114,24,0.35)] focus:border-brand transition-all";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="p-7 max-w-xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Profile</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Update your personal information.
        </p>
      </div>

      <div className="bg-card border border-border rounded-[10px] p-6 mb-4">
        <h2 className="text-[14px] font-semibold mb-1">Personal Information</h2>
        <p className="text-[12px] text-muted-foreground mb-5">
          This is how you appear across Zyraa.
        </p>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="first-name"
                className="text-[12px] font-medium text-muted-foreground"
              >
                First name
              </label>
              <input
                id="first-name"
                type="text"
                defaultValue={firstName}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="last-name"
                className="text-[12px] font-medium text-muted-foreground"
              >
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
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[12px] font-medium text-muted-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={user.email}
              className={inputClass}
            />
          </div>
          <Button type="submit" variant="brand" size="sm">
            Save changes
          </Button>
        </form>
      </div>

      <div className="bg-destructive/5 border border-destructive/20 rounded-[10px] p-5">
        <h2 className="text-[13px] font-semibold text-destructive mb-1">
          Delete account
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
