import type { ReactNode } from "react";

interface Props {
  code?: string;
  title: string;
  body: string;
  action?: ReactNode;
}

export function StatusMessage({ code, title, body, action }: Props) {
  return (
    <section className="grid gap-8 border-y-2 border-ink py-12 sm:py-16 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
      {code && (
        <p aria-hidden className="display text-[9rem] text-blue-bright sm:text-[12rem]">
          {code}
        </p>
      )}
      <div className="flex max-w-xl flex-col gap-4 pb-2">
        <h1 className="display text-5xl sm:text-6xl">{title}</h1>
        <p className="text-lg text-muted">{body}</p>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </section>
  );
}
