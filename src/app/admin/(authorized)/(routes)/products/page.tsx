import { CreateProductModal } from "../../_components/products/create-modal";
import { ProductsTable } from "../../_components/products/table";
import { PageTitle } from "../../_components/navbar/page-title";

import { getProducts } from "@/server/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <PageTitle title='Products'>
        <CreateProductModal />
      </PageTitle>
      <ProductsTable products={products} />
    </div>
  );
}
