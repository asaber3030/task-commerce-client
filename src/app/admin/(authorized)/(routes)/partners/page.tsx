import { CreatePartnerModal } from "../../_components/partners/create-modal";
import { PageTitle } from "../../_components/navbar/page-title";
import { PartnersTable } from "../../_components/partners/table";

import { getPartners } from "@/server/partners";

export default async function ProductsPage() {
  const partners = await getPartners();

  return (
    <div>
      <PageTitle title='Partners'>
        <CreatePartnerModal />
      </PageTitle>
      <PartnersTable partners={partners} />
    </div>
  );
}
