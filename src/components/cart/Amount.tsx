import { formatCurrency } from "@/utils";

type AmountProps = {
  label: string;
  amount: number;
  discount?: boolean;
};

export default function Amount({ label, amount, discount }: AmountProps) {
  return (
    <div className="flex justify-between py-6 text-gray-900">
      <dt className="font-bold text-gray-900">{label}</dt>
      <dd className={`text-sm font-medium ${discount ? "text-red-600" : "text-gray-900"}`}>
        ${formatCurrency(amount)}
      </dd>
    </div>
  );
}
