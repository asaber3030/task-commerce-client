import { getCategories } from "@/server/categories";
import FindProducts from "./_filter";

export default async function FilterPage() {
  const categories = await getCategories();

  return (
    <div className='py-20 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold mb-1'>Filter based on some questions</h1>
      <p className='text-sm text-gray-500 mb-10'>
        This is a page where you can filter products based on some questions.
      </p>

      <FindProducts categories={categories} />
    </div>
  );
}
