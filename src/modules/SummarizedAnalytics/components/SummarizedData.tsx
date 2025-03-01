interface SummarizedDataProps {
  totalSales: number | null;
  totalRevenue: number | null;
  isHourlySummarized: boolean;
  totalLostRevenue: number;
}

export const SummarizedData: React.FC<SummarizedDataProps> = ({
  totalSales,
  totalRevenue,
  isHourlySummarized,
  totalLostRevenue,
}) => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Суммарные данные
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {isHourlySummarized
            ? "Средняя прибыль в час"
            : "Общее количество продаж"}
          :
        </span>
        <span className="text-lg font-semibold text-black">
          {" "}
          {totalSales?.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-600">Общая выручка:</span>
        <span className="text-lg font-semibold text-black">
          {totalRevenue?.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
      </div>
      {isHourlySummarized && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">
            Суммарная упущеная выгода:
          </span>
          <span className="text-lg font-semibold text-black">
            {totalLostRevenue?.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </span>
        </div>
      )}
    </div>
  );
};
