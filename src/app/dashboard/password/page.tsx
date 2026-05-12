import { Button } from "@/components/ui/button";

const inputClass =
  "w-full px-3 py-[9px] rounded-[6px] bg-bg-input border border-border-mid text-[13px] text-foreground placeholder:text-fg-subtle focus:outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(217,114,24,0.10)] transition-all";

const labelClass = "block text-[12px] font-medium text-muted-foreground mb-1.5";

export default function PasswordPage() {
  return (
    <div className="py-7 px-8 max-w-xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Password</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Change your account password.
        </p>
      </div>

      <div className="bg-card border border-border rounded-[10px] p-6">
        <h2 className="text-[13px] font-semibold mb-0.5">Change Password</h2>
        <p className="text-[12px] text-muted-foreground mb-5">
          Must be at least 8 characters.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="current-pw" className={labelClass}>
              Current password
            </label>
            <input
              id="current-pw"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="new-pw" className={labelClass}>
              New password
            </label>
            <input
              id="new-pw"
              type="password"
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirm-pw" className={labelClass}>
              Confirm new password
            </label>
            <input
              id="confirm-pw"
              type="password"
              placeholder="Repeat new password"
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
          <Button type="submit" variant="brand" size="sm">
            Update password
          </Button>
        </form>
      </div>
    </div>
  );
}
