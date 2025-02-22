import { getPage, getPageSections } from "@/server/pages";
import { notFound } from "next/navigation";
import { PageTitle } from "../../../_components/navbar/page-title";
import { UpdateSectionForm } from "../../../_components/sections/update-form";
import { EmptyState } from "../../../_components/empty-state";

type Props = {
  params: Promise<{
    pageId: string;
  }>;
};

export default async function PageIdSection({ params }: Props) {
  const page = await getPage(+(await params).pageId);
  if (!page) return notFound();

  const sections = await getPageSections(page.id);

  const pageTitle = (
    <span>
      Sections - <b>{page.name}</b>
    </span>
  );

  return (
    <div>
      <PageTitle title={pageTitle} />
      {sections.length === 0 && <EmptyState />}
      <div className='space-y-4'>
        {sections.map((section) => (
          <UpdateSectionForm
            key={`page-section-idx-${section.id}`}
            section={section}
            translations={section.translations}
          />
        ))}
      </div>
    </div>
  );
}
