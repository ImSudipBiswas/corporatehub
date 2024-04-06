import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { jobSchema } from "@/lib/utils";
import { currentOrg } from "@/lib/org";

export async function POST(req: Request) {
  const reqBody = await req.json();

  const validated = jobSchema.safeParse(reqBody);
  if (!validated.success) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  try {
    const org = await currentOrg();
    if (!org) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const job = await db.job.create({
      data: {
        ...validated.data,
        deadline: new Date(validated.data.deadline),
        organizationId: validated.data.organizationId || org.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.log("JOBS_POST", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = +(url.searchParams.get("page") as string) || 1;
    const limit = +(url.searchParams.get("limit") as string);
    const search = url.searchParams.get("search") as string;
    const orgId = url.searchParams.get("orgId") as string;
    const skip = (page - 1) * limit;

    let where = {};
    if (search?.length > 0) {
      where = { title: { contains: search, mode: "insensitive" } };
    }
    if (orgId?.length > 0) {
      where = { ...where, organizationId: orgId };
    }

    const jobsCount = await db.job.count({ where });

    const jobs = await db.job.findMany({
      where,
      take: limit || 3,
      skip,
      include: { organization: true },
      orderBy: { createdAt: "desc" },
    });

    const isNext = jobsCount > page * limit;

    return NextResponse.json({ jobs, jobsCount, isNext });
  } catch (error) {
    console.log("JOBS_GET", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
