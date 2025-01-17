interface CheckboxFilterProps {
  isSingleDaySelected: boolean | null;
  filterNoSales: boolean;
  setFilterNoSales: (value: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  isSingleDaySelected,
  filterNoSales,
  setFilterNoSales,
}) => (
  <div className="mb-4">
    <label className="flex items-center text-sm text-black">
      <input
        type="checkbox"
        checked={filterNoSales}
        onChange={() => setFilterNoSales(!filterNoSales)}
        className="mr-2"
      />
      {isSingleDaySelected
        ? "Показать только часы с продажами"
        : "Показать только дни с продажами"}
    </label>
  </div>
);

export default CheckboxFilter;
