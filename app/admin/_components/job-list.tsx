import axios from "axios";

import { JobWithOrganization } from "@/types";
import { JobCard } from "./job-card";
import { Pagination } from "./pagination";

const fetchJobs = async (orgId: string, page: number, search: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs?orgId=${orgId}&page=${page}&limit=10&search=${search}`
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

  if (!result.jobs.length) {
    return (
      <div className="mt-4 h-[23vh] w-full flex flex-col items-center justify-center">
        {search.length > 0 ? (
          <h4 className="text-lg font-semibold">
            No jobs found for the search term {`"${search}"`}
          </h4>
        ) : (
          <h4 className="font-semibold text-lg">
            <span className="text-primary">Create a job</span> to get started
          </h4>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 mt-4">
        {result?.jobs?.map((job: JobWithOrganization) => <JobCard job={job} key={job.id} />)}
      </div>
      <Pagination isNext={result.isNext} page={page} />
    </>
  );
};
