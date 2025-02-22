import { Skeleton } from "@/components/ui/skeleton";
import { SettingsSidebar } from "../../_components/settings/sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid xl:grid-cols-7 gap-10'>
      <div className='col-span-2'>
        <SettingsSidebar />
      </div>
      <div className='col-span-5'>{children}</div>
    </div>
  );
}
