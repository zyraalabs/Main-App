import { Button } from "@/components/ui/button";

const inputClass =
  "w-full h-9 px-3.5 rounded-lg bg-input border border-border text-[13.5px] text-foreground placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-[rgba(217,114,24,0.35)] focus:border-brand transition-all";

export default function PasswordPage() {
  return (
    <div className="p-7 max-w-xl">
      <div className="mb-6">
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">Password</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Change your account password.
        </p>
      </div>

      <div className="bg-card border border-border rounded-[10px] p-6">
        <h2 className="text-[14px] font-semibold mb-1">Change Password</h2>
        <p className="text-[12px] text-muted-foreground mb-5">
          Must be at least 8 characters.
        </p>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="current-pw"
              className="text-[12px] font-medium text-muted-foreground"
            >
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
          <div className="space-y-1.5">
            <label
              htmlFor="new-pw"
              className="text-[12px] font-medium text-muted-foreground"
            >
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
          <div className="space-y-1.5">
            <label
              htmlFor="confirm-pw"
              className="text-[12px] font-medium text-muted-foreground"
            >
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
