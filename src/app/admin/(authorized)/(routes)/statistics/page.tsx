import {
  getLoginHistory,
  getPageVisits,
  getProductSales,
  getProductSearches,
  getUserActivities
} from "@/server/stats";

import { AllCharts } from "../../_components/statistics/charts";
import { PageTitle } from "../../_components/navbar/page-title";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export default async function StatisticsPage() {
  const userActivities = await getUserActivities();
  const productSearches = await getProductSearches();
  const productSales = await getProductSales();
  const pageVisits = await getPageVisits();
  const loginHistory = await getLoginHistory();

  return (
    <div>
      <PageTitle title='Statistics'>
        <a href='/api/reports' target='_blank'>
          <Button variant='outline' icon={DownloadIcon}>
            Download Report
          </Button>
        </a>
      </PageTitle>
      <AllCharts
        userActivities={userActivities}
        productSales={productSales}
        productSearches={productSearches}
        pageVisits={pageVisits}
        loginHistory={loginHistory}
      />
    </div>
  );
}
