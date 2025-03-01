import { CreateProductModal } from "../../_components/products/create-modal";
import { ProductsTable } from "../../_components/products/table";
import { PageTitle } from "../../_components/navbar/page-title";

import { getProducts } from "@/server/products";
import { getCategories } from "@/server/categories";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div>
      <PageTitle title='Products'>
        <CreateProductModal categories={categories} />
      </PageTitle>
      <ProductsTable categories={categories} products={products} />
    </div>
  );
}
