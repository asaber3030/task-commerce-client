import { getUsers } from "@/server/users";

import { CreateUserModal } from "../../_components/users/create-modal";
import { UsersTable } from "../../_components/users/table";
import { PageTitle } from "../../_components/navbar/page-title";

export default async function AdminsPage() {
  const users = await getUsers();

  return (
    <div>
      <PageTitle title='Users'>
        <CreateUserModal />
      </PageTitle>
      <UsersTable users={users} />
    </div>
  );
}
