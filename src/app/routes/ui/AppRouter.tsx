import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import { SummarizedAnalyticsPage } from "src/pages/Analytics/SummarizedAnalytics";
import { HourlyAnalisticsPage } from "src/pages/Analytics/HourlyAnalistics";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/summarizedAnalytics" replace />}
          />
          <Route path="/hourlyAnalistics" element={<HourlyAnalisticsPage />} />
          <Route
            path="/summarizedAnalytics"
            element={<SummarizedAnalyticsPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};
