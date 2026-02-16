
import { FormFlow } from "@/components/list/FormFlow";
import { Sidebar } from "@/components/list/Sidebar";

export default function ListBotPage() {
  return (
    <div className="bg-[#f4f4f5] dark:bg-[#000000] min-h-screen flex flex-col font-display text-slate-900 dark:text-white antialiased selection:bg-[#FF6B00] selection:text-white overflow-x-hidden pt-20">
      <main className="flex-grow container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <FormFlow />
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
