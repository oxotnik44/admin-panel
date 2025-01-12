import React from "react";
import { AnalyticsModule } from "src/modules/Analistics";

const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4 text-black">Аналитика</h1>
      <AnalyticsModule />
    </div>
  );
};

export default AnalyticsPage;
