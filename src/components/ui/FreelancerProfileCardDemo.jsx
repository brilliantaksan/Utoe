import * as React from "react";
import { LayoutTemplate, Palette } from "lucide-react";
import { FreelancerProfileCard } from "@/components/ui/FreelancerProfileCard";

const ToolIcon = ({ icon: Icon }) => (
  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
    <Icon className="h-4 w-4" />
  </div>
);

export default function FreelancerProfileCardDemo() {
  const tools = [
    <ToolIcon key="tool-1" icon={LayoutTemplate} />,
    <ToolIcon key="tool-2" icon={Palette} />,
  ];

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-10">
      <FreelancerProfileCard
        name="Henrie Ekemezie"
        title="Web & UI/UX Designer"
        avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80"
        bannerSrc="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60"
        rating={4.0}
        duration="8 Days"
        rate="$40/hr"
        tools={tools}
        onGetInTouch={() => console.log("Get in touch clicked!")}
        onBookmark={() => console.log("Bookmark clicked!")}
      />
    </div>
  );
}
