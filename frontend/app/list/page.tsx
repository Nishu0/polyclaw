import { redirect } from "next/navigation";

// The /list (Submit Bot) page has been removed.
// Redirect to home so any existing links don't 404.
export default function ListPage() {
  redirect("/");
}
