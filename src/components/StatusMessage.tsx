import type { ReactNode } from "react";

interface Props {
  code?: string;
  title: string;
  body: string;
  action?: ReactNode;
}

export function StatusMessage({ code, title, body, action }: Props) {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center">
      {code && <p className="text-6xl font-bold tracking-tight text-accent">{code}</p>}
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </section>
  );
}
