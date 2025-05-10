"use client";

import { useState } from "react";
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
import type { ReportReason } from "@/lib/admin-data";
import { toast } from "sonner";
import { Flag } from "lucide-react";

interface ReportIdeaModalProps {
  ideaId: string;
  ideaTitle: string;
}

export function ReportIdeaModal({ ideaId, ideaTitle }: ReportIdeaModalProps) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Error", {
        description: "Please select a reason for reporting this idea.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, we would send this data to the server
    console.log({
      ideaId,
      reason,
      description,
    });

    setIsSubmitting(false);
    toast("Report submitted", {
      description: "Thank you for helping keep our community safe.",
    });

    // Reset form and close modal
    setReason(null);
    setDescription("");
    setReportModalOpen(false);
  };

  return (
    <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Report this idea">
          <Flag className="h-4 w-4" />
          <span className="sr-only">Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Idea</DialogTitle>
          <DialogDescription>
            Report &quot;{ideaTitle}&quot; if you believe it violates our
            community guidelines.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason for reporting</Label>
            <RadioGroup
              value={reason || ""}
              onValueChange={(value) => setReason(value as ReportReason)}
            >
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
              placeholder="Please provide any additional information that might help us understand the issue."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setReportModalOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
