import { formatCurrency } from "@/utils";

type AmountProps = {
  label: string;
  amount: number;
};

export default function Amount({ label, amount }: AmountProps) {
  return (
    <div className="flex justify-between py-6 text-gray-900">
      <dt className="font-bold text-gray-900">{label}</dt>
      <dd className="text-sm font-medium text-gray-900">
        ${formatCurrency(amount)}
      </dd>
    </div>
  );
}
