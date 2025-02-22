"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { LoginR } from "@/server/stats";
import { LoginHistory, PageVisit, ProductSale, ProductSearch, UserActivity } from "@prisma/client";
import { log } from "console";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb"
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa"
  }
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

type Props = {
  userActivities: UserActivity[];
  productSearches: ProductSearch[];
  productSales: ProductSale[];
  pageVisits: PageVisit[];
  loginHistory: LoginR[];
};

export const AllCharts = ({
  userActivities,
  productSales,
  productSearches,
  pageVisits,
  loginHistory
}: Props) => {
  function transformUserActivityData(userActivities: UserActivity[]) {
    return userActivities.map((activity) => ({
      month: new Date(activity.createdAt).toLocaleString("default", { month: "long" }),
      activity: activity.activity,
      count: 1
    }));
  }

  console.log({ loginHistory });

  function transformProductSearchData(productSearches: ProductSearch[]) {
    return productSearches.map((search) => ({
      query: search.query,
      count: search.count
    }));
  }

  function transformProductSaleData(productSales: ProductSale[]) {
    return productSales.map((sale) => ({
      productId: sale.productId,
      quantity: sale.quantity
    }));
  }

  function transformPageVisitData(pageVisits: PageVisit[]) {
    return pageVisits.map((sale) => ({
      userId: sale.userId,
      url: sale.pageUrl
    }));
  }

  function transformLoginHistoryData(userActivities: LoginR[]) {
    return loginHistory.map((history, idx) => ({
      count: history._count.userId,
      user: history.userId
    }));
  }

  const userActivityConfig = {
    activity: {
      label: "Activity",
      color: "#2563eb"
    }
  } satisfies ChartConfig;

  const productSearchConfig = {
    count: {
      label: "Searches",
      color: "#60a5fa"
    }
  } satisfies ChartConfig;

  const productSaleConfig = {
    quantity: {
      label: "Quantity Sold",
      color: "#34d399"
    }
  } satisfies ChartConfig;

  const pageVisitConfig = {
    quantity: {
      label: "Visits",
      color: "#854512"
    }
  } satisfies ChartConfig;

  const loginHistoryConfig = {
    ip: {
      label: "Login History",
      color: "#854512"
    }
  } satisfies ChartConfig;

  const d1 = transformUserActivityData(userActivities);
  const d2 = transformProductSearchData(productSearches);
  const d3 = transformProductSaleData(productSales);
  const d4 = transformPageVisitData(pageVisits);
  const d5 = transformLoginHistoryData(loginHistory);

  return (
    <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>User Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={userActivityConfig} className='min-h-[200px] w-full'>
            <BarChart data={d1}>
              <XAxis dataKey='activity' />
              <Tooltip />
              <Legend />
              <Bar dataKey='count' fill='var(--color-activity)' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productSearchConfig} className='min-h-[200px] w-full'>
            <BarChart data={d2}>
              <XAxis dataKey='query' />
              <Tooltip />
              <Legend />
              <Bar dataKey='count' fill='#752413' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={productSaleConfig} className='min-h-[200px] w-full'>
            <BarChart data={d3}>
              <XAxis dataKey='productId' />
              <Tooltip />
              <Legend />
              <Bar dataKey='quantity' fill='#641241' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pageVisitConfig} className='min-h-[200px] w-full'>
            <BarChart data={d4}>
              <XAxis dataKey='url' />
              <Tooltip />
              <Legend />
              <Bar dataKey='userId' fill='#999214' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={loginHistoryConfig} className='min-h-[200px] w-full'>
            <BarChart data={d5}>
              <XAxis dataKey='userId' />
              <Tooltip />
              <Legend />
              <Bar dataKey='count' fill='#821591' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
