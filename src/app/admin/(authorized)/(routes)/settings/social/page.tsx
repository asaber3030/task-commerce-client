import { getSettings } from "@/server/app";
import { SocialSettings } from "../../../_components/settings/social-settings";

export default async function SocialPage() {
  const settings = await getSettings();

  return <SocialSettings settings={settings} />;
}
