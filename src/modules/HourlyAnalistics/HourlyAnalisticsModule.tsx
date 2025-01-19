import React, { useState } from "react";

import { useProductData } from "./hooks/useProductData";
import { getProductsForHour } from "./hooks/useProductsForDay";
import CheckboxFilter from "./components/CheckboxFilter";
import DateRange from "./ui/DateRange";

import SalesTable from "./components/SalesTable";

import { SummarizedData } from "../SummarizedAnalytics/components/SummarizedData";
import { ProductData } from "./types/TableDataTypes";

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
  selectedView: string;
};

export const HourlyAnalyticsModule: React.FC<HourlyAnalyticsModuleProps> = ({
  initialData,
  productName,
  dateRange,
  isSingleDaySelected,
  selectedView,
}) => {
  const [filterNoSales, setFilterNoSales] = useState(false);
  const [openHours, setOpenHours] = useState<Set<string | undefined>>(
    new Set()
  ); // Используем Set для хранения открытых часов или дат
  const isDayAnalitics = selectedView === "day";

  let productData = useProductData({
    initialData,
    productName,
    dateRange,
    isSingleDaySelected,
    filterNoSales,
    isDayAnalitics,
  });

  // Функция для вычисления общей суммы продаж

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
  const renderProductTable = () => {
    let sum = 0;

    productData.map((item) => {
      // Получаем дату или час в зависимости от типа
      const itemDateOrHour = "date" in item ? item.date : item.hour;
      // Получаем список продуктов для данного интервала
      const filteredProducts = getProductsForHour(
        itemDateOrHour as string,
        dateRange,
        productName
      );
      filteredProducts.map((item) => {
        if (selectedView === "day") {
          if (item.sold !== 0) {
            sum += item.price * item.sold;
          }
        } else {
          // Сравниваем item.name с productName, а не с целым массивом
          if (item.name === productName) {
            if (item.sold !== 0) {
              sum += item.price * item.sold;
            }
          }
        }
      });
    });

    return Math.round(sum / 24);
  };
  const avaragePerHour = renderProductTable();

  const calculateTotalLostRevenue = (): number => {
    let sum = 0;
    let lost = 0;
    productData.map((item) => {
      const itemDateOrHour = "date" in item ? item.date : item.hour;
      let a = getProductsForHour(
        itemDateOrHour as string,
        dateRange,
        productName
      );
      if (a.length !== 0) {
        lost++;
      }
      a.map((item) => {
        if (item.sold !== 0) {
          sum += item.price * item.sold;
        }
      });
    });
    return (sum / 24) * lost;
  };

  // Если даты не совпадают, можно просто использовать диапазон дат
  const totalLostRevenue = calculateTotalLostRevenue();
  const totalRevenue = calculateTotalRevenue(productData);
  return (
    <div>
      <DateRange dateRange={dateRange} productName={productName} />

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
        productName={productName}
        selectedView={selectedView}
      />
      <SummarizedData
        totalSales={avaragePerHour}
        totalRevenue={totalRevenue}
        isHourlySummarized={true}
        totalLostRevenue={totalLostRevenue}
      />
    </div>
  );
};

const calculateTotalRevenue = (productData: ProductData[]): number => {
  return productData.reduce((total, item) => total + item.amount, 0);
};

export default HourlyAnalyticsModule;
