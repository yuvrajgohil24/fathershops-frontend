import Link from "next/link";
import { StatusMessage } from "@/components/StatusMessage";
import { getI18n } from "@/lib/language";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <StatusMessage
      code="404"
      title={t.notFoundTitle}
      body={t.notFoundBody}
      action={
        <Link href="/" className="btn btn-primary">
          {t.backHome}
        </Link>
      }
    />
  );
}
