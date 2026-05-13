interface PageHeaderProps {
  title: string;
  sub: string;
}

export function PageHeader({ title, sub }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-[20px] font-bold tracking-[-0.02em]">{title}</h1>
      <p className="text-[13px] text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}
