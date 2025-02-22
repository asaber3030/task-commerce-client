import Link from "next/link";

import { PageTitle } from "../../_components/navbar/page-title";
import { getPages } from "@/server/pages";
import { adminRoutes } from "../../_helpers/routes";

export default async function PagesSections() {
  const pages = await getPages();

  return (
    <div>
      <PageTitle title='Sections' />

      <div className='grid xl:grid-cols-3 gap-2 grid-cols-2'>
        {pages.map((page) => (
          <Link
            key={`page-${page.id}-sec`}
            href={adminRoutes.sections.pageSections(page.id)}
            className='bg-white p-2 rounded-lg shadow-md px-4 capitalize hover:bg-gray-100 transition-all border font-medium flex justify-between items-center'
          >
            <span>{page.name}</span>
            <span className='text-gray-500 text-sm'>{page._count.sections} section</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
