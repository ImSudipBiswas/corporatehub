import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { jobSchema } from "@/lib/utils";
import { currentOrg } from "@/lib/org";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.job.delete({
      where: { id: params.id },
    });

    return NextResponse.json("Job deleted successfully");
  } catch (error) {
    console.log("JOB_ID_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
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

    if (org.id !== validated.data.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const job = await db.job.update({
      where: { id: params.id, organizationId: org.id },
      data: {
        ...validated.data,
        deadline: new Date(validated.data.deadline),
        organizationId: validated.data.organizationId || org.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log("JOB_ID_PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
