import { getUsers } from "@/server/users";

import { CreateUserModal } from "../../_components/users/create-modal";
import { UsersTable } from "../../_components/users/table";
import { PageTitle } from "../../_components/navbar/page-title";
import { getEmployees } from "@/server/employees";
import { EmployeesTable } from "../../_components/employees/table";
import { CreateEmployeeModal } from "../../_components/employees/create-modal";

export default async function AdminsPage() {
  const employees = await getEmployees();

  return (
    <div>
      <PageTitle title='Employees'>
        <CreateEmployeeModal />
      </PageTitle>
      <EmployeesTable employees={employees} />
    </div>
  );
}
