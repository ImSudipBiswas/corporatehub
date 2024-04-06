import axios from "axios";

import { JobWithOrganization } from "@/types";
import { JobCard } from "./job-card";

const fetchJobs = async (orgId: string, page: number, search: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs?orgId=${orgId}&page=${page}&search=${search}`
  );
  return res.data;
};

export const JobList = async ({
  orgId,
  page = 1,
  search = "",
}: {
  orgId: string;
  page: number;
  search: string;
}) => {
  const result = await fetchJobs(orgId, page, search);

  return (
    <section className="w-full py-6 mt-4">
      <div className="flex items-center justify-between"></div>
      <div className="flex flex-col mt-4">
        {result?.jobs?.map((job: JobWithOrganization) => <JobCard job={job} key={job.id} />)}
      </div>
    </section>
  );
};
