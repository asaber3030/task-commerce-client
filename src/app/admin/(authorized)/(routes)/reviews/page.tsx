import { CreateReviewModal } from "../../_components/reviews/create-modal";
import { ReviewsTable } from "../../_components/reviews/table";
import { PageTitle } from "../../_components/navbar/page-title";

import { getReviews } from "@/server/reviews";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div>
      <PageTitle title='Reviews'>
        <CreateReviewModal />
      </PageTitle>
      <ReviewsTable reviews={reviews} />
    </div>
  );
}
