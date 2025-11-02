"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { experienceLevels, JobsTable } from "@/drizzle/schemas/job";
import { createJobAction, updateJobAction } from "../actions";
import { jobSchema } from "../schemas";
import { formatExperienceLevel } from "../utils";

type jobFormData = z.infer<typeof jobSchema>;

export function JobForm({
  job,
}: Readonly<{
  job?: Pick<typeof JobsTable.$inferSelect, "id" | "name" | "description" | "experienceLevel">;
}>) {
  const form = useForm<jobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: job ?? {
      name: "",
      description: "",
      experienceLevel: "junior",
    },
  });

  async function onSubmit(values: jobFormData) {
    const action = job ? updateJobAction.bind(null, job.id) : createJobAction;
    const res = await action(values);

    if (res.error) {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Used to identify the job, e.g. &quot;Software Engineer - Company X&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <FormField
            name="experienceLevel"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {formatExperienceLevel(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Paste the job description here. This will be used to generate questions and evaluating your resume.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={form.formState.isSubmitting} type="submit" className="w-full">
          Save Job
        </LoadingButton>
      </form>
    </Form>
  );
}
