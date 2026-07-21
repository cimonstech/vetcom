import type { Metadata } from "next";

import { MessagesList } from "@/components/admin/MessagesList";
import { getContactSubmissions } from "@/lib/supabase/adminQueries";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default async function AdminMessagesPage() {
  const messages = await getContactSubmissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Messages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Contact form submissions ({messages.length}). Email notifications are also sent via
          SMTP when configured.
        </p>
      </div>

      <MessagesList messages={messages} />
    </div>
  );
}
