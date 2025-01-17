interface DateRangeProps {
  dateRange: [Date | null, Date | null];
  productName: string;
}

const DateRange: React.FC<DateRangeProps> = ({ dateRange, productName }) => (
  <h2 className="text-2xl font-semibold mb-4 text-black">
    Данные по : {dateRange[0]?.toLocaleDateString("ru-RU")}{" "}
    - {dateRange[1]?.toLocaleDateString("ru-RU")}
  </h2>
);

export default DateRange;
