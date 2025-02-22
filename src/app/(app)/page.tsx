import { HomeContactSection } from "@/components/pages/home/contact";
import { HomeHeroSection } from "@/components/pages/home/hero";
import { HomeSecuritySection } from "@/components/pages/home/security";
import { HomeFeaturesSection } from "@/components/pages/home/services";
import { HomeSplitSection } from "@/components/pages/home/split";
import { HomeTimelineSection } from "@/components/pages/home/timeline";
import { getFullPage } from "@/server/pages";
import { notFound } from "next/navigation";

export default async function Home() {
  const page = await getFullPage("home");

  const intro = page?.sections.find((s) => s.name === "intro");
  const features = page?.sections.find((s) => s.name === "features");
  const split = page?.sections.find((s) => s.name === "split");
  const security = page?.sections.find((s) => s.name === "security");
  const timeline = page?.sections.find((s) => s.name === "timeline");
  const contact = page?.sections.find((s) => s.name === "contact");

  if (!page) return notFound();

  return (
    <div>
      <HomeHeroSection section={intro!} />
      <HomeFeaturesSection section={features!} />
      <HomeSplitSection section={split!} />
      <HomeSecuritySection section={security!} />
      <HomeTimelineSection section={timeline!} />
      <HomeContactSection section={contact!} />
    </div>
  );
}
