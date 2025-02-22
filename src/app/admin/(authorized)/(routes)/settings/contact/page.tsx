import { getSettings } from "@/server/app";
import { ContactSettings } from "../../../_components/settings/contat-settings";

export default async function SettingsPage() {
  const settings = await getSettings();

  return <ContactSettings settings={settings} />;
}
