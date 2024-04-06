import axios from "axios";

import type { JobWithOrganization } from "@/types";
import { JobCard } from "./job-card";

const fetchJobs = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs?page=1&limit=3`);
  return res.data;
};

export const Feed = async () => {
  const res = await fetchJobs();
  const jobs = res?.jobs;

  return (
    <section className="mt-4 w-full py-2 mb-10">
      <h5 className="text-medium">Recommended for you</h5>
      <div className="z-20 w-full mt-6 flex items-center gap-6 py-2 overflow-x-scroll scrollbar_hidden">
        {jobs?.map((data: JobWithOrganization) => <JobCard key={data.id} data={data} />)}
      </div>
    </section>
  );
};
