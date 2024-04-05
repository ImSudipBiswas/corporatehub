import { redirect } from "next/navigation";

import { currentOrg } from "@/lib/current-org";
import { JobList } from "./_components/job-list";
import { CreateJobModalTrigger } from "./_components/create-job-modal-trigger";

export default async function AdminPage() {
  const org = await currentOrg();
  if (!org) {
    return redirect("/");
  }

  return (
    <>
      <section className="w-full py-10 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="md:text-lg text-muted-foreground font-medium">
              Welcome back, <span className="text-primary">{org?.name} Admin</span>
            </p>
          </div>
          <CreateJobModalTrigger />
        </div>
      </section>
      <JobList />
    </>
  );
}
