import type { Job, Organization } from "@prisma/client";

export type JobWithOrganization = Job & { organization: Organization };
