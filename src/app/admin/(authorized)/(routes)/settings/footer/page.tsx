import { getSettings } from "@/server/app";
import { SocialSettings } from "../../../_components/settings/social-settings";
import { FooterSettings } from "../../../_components/settings/footer";

export default async function SocialPage() {
  const settings = await getSettings();

  return <FooterSettings settings={settings} />;
}
