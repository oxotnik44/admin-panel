import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import AnalyticsPage from "src/pages/Analytics/AnalyticsPage";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/analytics" replace />} />

          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
