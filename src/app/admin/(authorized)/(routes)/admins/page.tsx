import { getAdmins } from "@/server/admins";
import { CreateAdminModal } from "../../_components/admins/create-modal";
import { AdminsTable } from "../../_components/admins/table";
import { PageTitle } from "../../_components/navbar/page-title";

export default async function AdminsPage() {
  const admins = await getAdmins();

  return (
    <div>
      <PageTitle title='Admins'>
        <CreateAdminModal />
      </PageTitle>
      <AdminsTable admins={admins} />
    </div>
  );
}
