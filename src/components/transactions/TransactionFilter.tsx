"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { getSalesByDate } from "@/api";
import { useQuery } from "@tanstack/react-query";
import TransactionSummary from "./TransactionSummary";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionFilter() {
  const [date, setDate] = useState<Value>(new Date());
  const formattedDate = format(date?.toString()!, "yyyy-MM-dd");
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });



  const total = data?.reduce((acc, transaction) => acc + +transaction.total, 0) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar onChange={setDate} value={date} locale="es" />
      </div>

      <div>
        {isLoading && 'Loading transactions...'}
        {
          data ? data.length ? data.map((transaction) => (
            <TransactionSummary key={transaction.id} transaction={transaction} />
          )) : <p>No transactions found for the selected date.</p> : <p>Please select a date to view transactions.</p>
        }
        <div className="mt-4 p-4 border-t border-gray-200">
          <h2 className="text-lg font-bold">Total Sales: ${total.toFixed(2)}</h2>
        </div>

      </div>
    </div>
  );
}
