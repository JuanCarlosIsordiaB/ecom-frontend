import { getSalesByDate } from "@/api";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { format } from "date-fns/format";

export default async function SalesPage() {
  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = format(today.toString(), "yyyy-MM-dd");
  await  queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: async () => {
      await getSalesByDate(formattedDate);
    },
  });
  return (
    <>
      <Heading> Sales</Heading>
      <p className="text-gray-700">
        In this section you can view and manage all sales records.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
}
