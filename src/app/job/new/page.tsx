import { BackLink } from "@/components/BackLink";
import { Card, CardContent } from "@/components/ui/card";
import { JobForm } from "@/features/jobs/components/JobForm";

export default function NewJobPage() {
  return (
    <div className="container my-4 max-w-5xl space-y-4">
      <BackLink href="/">Job Board</BackLink>
      <h2 className="text-3xl md:text-4xl">Create New Job Posting</h2>
      <Card>
        <CardContent>
          <JobForm />
        </CardContent>
      </Card>
    </div>
  );
}
