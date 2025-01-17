import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { HourlyAnalyticsModule } from "src/modules/HourlyAnalistics";
import { initialData } from "src/modules/SummarizedAnalytics/utils/initialData";

export const HourlyAnalisticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;
  const isSingleDaySelected =
    startDate && endDate && startDate.getTime() === endDate.getTime();
  return (
    <div className="flex flex-col p-4 bg-gray-50">
      <div className="mb-4 flex items-center space-x-4">
        <DatePicker
          selectsRange
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={setDateRange}
          isClearable
          placeholderText="Выберите диапазон"
          className="border px-2 py-1 rounded"
          locale="ru"
        />
      </div>
      <HourlyAnalyticsModule
        initialData={initialData}
        productName="Товар 1"
        dateRange={dateRange}
        isSingleDaySelected={isSingleDaySelected}
      />
    </div>
  );
};
