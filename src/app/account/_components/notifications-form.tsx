"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export const NotificationsForm = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    ideaComments: true,
    ideaUpvotes: true,
    newFeatures: true,
    newsletter: false,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));

    // In a real app, we would save this to the database
    toast("Preferences updated", {
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Email Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive email notifications for important updates
          </p>
        </div>
        <Switch
          checked={notificationPreferences.emailNotifications}
          onCheckedChange={(checked) =>
            handleNotificationChange("emailNotifications", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Idea Comments</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when someone comments on your ideas
          </p>
        </div>
        <Switch
          checked={notificationPreferences.ideaComments}
          onCheckedChange={(checked) =>
            handleNotificationChange("ideaComments", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Idea Upvotes</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when someone upvotes your ideas
          </p>
        </div>
        <Switch
          checked={notificationPreferences.ideaUpvotes}
          onCheckedChange={(checked) =>
            handleNotificationChange("ideaUpvotes", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">New Features</Label>
          <p className="text-sm text-muted-foreground">
            Get notified about new features and updates
          </p>
        </div>
        <Switch
          checked={notificationPreferences.newFeatures}
          onCheckedChange={(checked) =>
            handleNotificationChange("newFeatures", checked)
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Newsletter</Label>
          <p className="text-sm text-muted-foreground">
            Receive our monthly newsletter with top ideas and tips
          </p>
        </div>
        <Switch
          checked={notificationPreferences.newsletter}
          onCheckedChange={(checked) =>
            handleNotificationChange("newsletter", checked)
          }
        />
      </div>
    </div>
  );
};
