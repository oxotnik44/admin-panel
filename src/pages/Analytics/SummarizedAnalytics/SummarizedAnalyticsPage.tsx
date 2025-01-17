import React from "react";
import { SummarizedAnalyticsModule } from "src/modules/SummarizedAnalytics";

export const SummarizedAnalyticsPage: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4 text-black">Аналитика</h1>
      <SummarizedAnalyticsModule />
    </div>
  );
};
