"use server";

import { revalidatePath } from "next/cache";

import JobModel from "@/models/job";
import type { Job } from "@/types";
import type { JobFormValues } from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import { currentOrg } from "./auth";

export async function fetchJobs(page: number) {
  try {
    await connectToDB();

    const org = await currentOrg();
    if (!org) {
      throw new Error("Unauthorized");
    }

    const skip = (page - 1) * 10;

    const jobs: Job[] = await JobModel.find({ organizationId: org._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(5);

    return JSON.stringify(jobs);
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
}

export async function createJob(values: JobFormValues) {
  try {
    await connectToDB();

    const org = await currentOrg();
    if (!org) {
      throw new Error("Unauthorized");
    }

    const deadline = new Date(values.deadline).toISOString();

    const job = new JobModel({ ...values, deadline, organization: org._id });
    await job.save();

    revalidatePath("/admin");

    return JSON.stringify(job);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create job");
  }
}

export async function updateJob(id: string, values: JobFormValues) {
  try {
    await connectToDB();

    const org = await currentOrg();
    if (!org) {
      throw new Error("Unauthorized");
    }

    if (org._id !== values.organizationId) {
      throw new Error("Unauthorized");
    }

    const existingJob = await JobModel.findById(id);
    if (!existingJob) {
      throw new Error("Invalid ID");
    }

    const deadline = new Date(values.deadline).toISOString();

    const job = await JobModel.findByIdAndUpdate(
      id,
      { $set: { ...values, deadline } },
      { new: true }
    );

    revalidatePath("/admin");

    return JSON.stringify(job);
  } catch (error) {
    throw new Error("Failed to update job");
  }
}

export async function deleteJob(id: string) {
  try {
    await connectToDB();

    const org = await currentOrg();
    if (!org) {
      throw new Error("Unauthorized");
    }

    const job = await JobModel.findById(id);
    if (!job) {
      throw new Error("Invalid ID");
    }

    if (org._id !== job.organizationId) {
      throw new Error("Unauthorized");
    }

    await JobModel.findByIdAndDelete(id);

    revalidatePath("/admin");

    return true;
  } catch (error) {
    throw new Error("Failed to delete job");
  }
}
