import { SuggestionsTable } from "../../_components/suggestions/table";
import { PageTitle } from "../../_components/navbar/page-title";

import { getSuggestions } from "@/server/suggestions";

export default async function AdminsPage() {
  const suggestions = await getSuggestions();

  return (
    <div>
      <PageTitle title='Suggestions' />
      <SuggestionsTable suggestions={suggestions} />
    </div>
  );
}
