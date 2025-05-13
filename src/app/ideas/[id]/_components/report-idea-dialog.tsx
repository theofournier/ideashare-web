"use client";

import { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flag } from "lucide-react";
import { Idea } from "@/lib/supabase/types";
import { reportIdeaAction } from "@/lib/supabase/actions/report/report-idea-action";

interface Props {
  idea: Idea;
}

export function ReportIdeaDialog({ idea }: Props) {
  const action = reportIdeaAction.bind(null, idea.id);
  const [state, formAction, isPending] = useActionState(action, {
    errorMessage: "",
  });
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Report this idea">
          <Flag className="h-4 w-4" />
          <span className="sr-only">Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Report Idea</DialogTitle>
            <DialogDescription>
              Report &quot;{idea.title}&quot; if you believe it violates our
              community guidelines.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for reporting</Label>
              <RadioGroup id="reason" name="reason" required>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate">Inappropriate content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam">Spam or misleading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offensive" id="offensive" />
                  <Label htmlFor="offensive">Offensive or harmful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="copyright" id="copyright" />
                  <Label htmlFor="copyright">Copyright infringement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="misinformation" id="misinformation" />
                  <Label htmlFor="misinformation">Misinformation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional details (optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please provide any additional information that might help us understand the issue."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
