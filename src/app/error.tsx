"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { StatusMessage } from "@/components/StatusMessage";
import { DEFAULT_LANGUAGE, getDictionary, isLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/types";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // Errors usually come from server-side data fetching, so re-fetch the
  // server components before resetting the boundary.
  const retry = () =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  useEffect(() => {
    console.error(error);
    const documentLang = document.documentElement.lang;
    if (isLanguage(documentLang)) setLang(documentLang);
  }, [error]);

  const t = getDictionary(lang);

  return (
    <StatusMessage
      title={t.errorTitle}
      body={t.errorBody}
      action={
        <button
          type="button"
          onClick={retry}
          disabled={pending}
          className="btn btn-primary disabled:cursor-wait"
        >
          {t.retry}
        </button>
      }
    />
  );
}
