import { PageTitle } from "../../_components/navbar/page-title";
import { CreateCategoryModal } from "../../_components/categories/create-modal";
import { getCategories } from "@/server/categories";
import { CategoriesTable } from "../../_components/categories/table";

export default async function AdminsPage() {
  const categories = await getCategories();

  return (
    <div>
      <PageTitle title='Categories'>
        <CreateCategoryModal />
      </PageTitle>
      <CategoriesTable categories={categories} />
    </div>
  );
}
