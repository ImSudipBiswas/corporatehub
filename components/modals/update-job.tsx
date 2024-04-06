"use client";

import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { JobFormValues, cn, jobSchema } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export const UpdateJobModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      minSalary: 40000,
      maxSalary: 60000,
      location: "Remote",
      organizationId: "",
      deadline: new Date().toISOString(),
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: JobFormValues) => {
    try {
      await axios.patch(`/api/jobs/${data?.id}`, values);
      toast.success("Job opening updated successfully");
      router.refresh();
      handleClose();
    } catch (error: AxiosError | any) {
      toast.error(error?.response?.data || error.message);
      form.reset();
    }
  };

  const isModalOpen = isOpen && type === "update-job";
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.setValue("title", data?.title);
      form.setValue("description", data?.description);
      form.setValue("minSalary", data?.minSalary);
      form.setValue("maxSalary", data?.maxSalary);
      form.setValue("location", data?.location);
      form.setValue("organizationId", data?.organizationId);
      form.setValue("deadline", new Date(data?.deadline).toISOString());
    }
  }, [data, form]);

  if (!data) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update an existing job opening</DialogTitle>
          <DialogDescription>
            Update the details of the job opening below. Make sure to provide accurate information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" type="text" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Job description" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Job location" type="text" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="minSalary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum salary in USD</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Min salary"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="maxSalary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum salary in USD</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Max salary"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a deadline</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        // @ts-ignore
                        onSelect={(val) => field.onChange(new Date(val).toISOString())}
                        disabled={isLoading || ((date) => date < new Date() || date === new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The deadline for applying to this job opening.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="flex items-center w-full">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
