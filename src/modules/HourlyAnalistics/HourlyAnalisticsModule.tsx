import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductData } from "./hooks/useProductData";
import { getProductsForHour } from "./hooks/useProductsForDay";
import CheckboxFilter from "./components/CheckboxFilter";
import DateRange from "./ui/DateRange";
import ButtonBack from "./ui/ButtonBack";
import SalesTable from "./components/SalesTable";
import ViewSelector from "./components/ViewSelector";

type HourlyAnalyticsModuleProps = {
  initialData: {
    name: string;
    timestamp: string;
    sold: number;
    price: number;
    total: number;
  }[];
  productName: string;
  dateRange: [Date | null, Date | null];
  isSingleDaySelected: boolean | null;
};

export const HourlyAnalyticsModule: React.FC<HourlyAnalyticsModuleProps> = ({
  initialData,
  productName,
  dateRange,
  isSingleDaySelected,
}) => {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate("/summarizedAnalytics"); // Возвращает на предыдущую страницу в истории
  };

  const [filterNoSales, setFilterNoSales] = useState(false);
  const [openHours, setOpenHours] = useState<Set<string | undefined>>(
    new Set()
  ); // Используем Set для хранения открытых часов или дат
  const [selectedView, setSelectedView] = useState("product"); // Состояние для выбора "товар" или "день"
  const isDayAnalitics = selectedView === "day";

  let productData = useProductData({
    initialData,
    productName,
    dateRange,
    isSingleDaySelected,
    filterNoSales,
    isDayAnalitics,
  });

  // Функция для обработки клика по часу или дате
  const handleHourClick = (hour: string | undefined) => {
    setOpenHours((prevOpenHours) => {
      const newOpenHours = new Set(prevOpenHours);
      if (newOpenHours.has(hour)) {
        newOpenHours.delete(hour); // Если элемент уже открыт, закрываем его
      } else {
        newOpenHours.add(hour); // Если элемент закрыт, открываем его
      }

      return newOpenHours;
    });
  };

  return (
    <div>
      <ButtonBack onClick={onBackClick} />
      <DateRange dateRange={dateRange} productName={productName} />
      <ViewSelector
        selectedView={selectedView}
        onChange={(value) => setSelectedView(value)}
      />

      {/* Фильтрация по дням/часам */}
      <CheckboxFilter
        isSingleDaySelected={isSingleDaySelected}
        filterNoSales={filterNoSales}
        setFilterNoSales={setFilterNoSales}
      />

      {/* Отображение таблицы в зависимости от выбранного типа */}
      <SalesTable
        isSingleDaySelected={isSingleDaySelected}
        productData={productData}
        openHours={openHours}
        handleHourClick={handleHourClick}
        getProductsForHour={getProductsForHour}
        dateRange={dateRange}
      />
    </div>
  );
};

export default HourlyAnalyticsModule;
