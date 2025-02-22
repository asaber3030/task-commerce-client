import { getSettings } from "@/server/app";
import { PageTitle } from "../../_components/navbar/page-title";
import { AppSettings } from "../../_components/settings/app-settings";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <AppSettings settings={settings} />
    </div>
  );
}
