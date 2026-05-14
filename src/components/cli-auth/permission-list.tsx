import { CheckCircle2 } from "lucide-react";

const PERMISSIONS = [
  "Generate and run builds on your behalf",
  "Read your account plan and usage limits",
  "Create and manage CLI configuration tokens",
];

export function PermissionList() {
  return (
    <div className="flex flex-col gap-2">
      {PERMISSIONS.map((p) => (
        <div key={p} className="flex items-start gap-2.5">
          <CheckCircle2 className="size-3.5 text-success-l mt-0.5 shrink-0" />
          <span className="text-[12.5px] text-muted-foreground">{p}</span>
        </div>
      ))}
    </div>
  );
}
