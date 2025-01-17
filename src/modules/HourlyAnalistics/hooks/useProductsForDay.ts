import { initialData } from "src/modules/SummarizedAnalytics/utils/initialData";

// Фильтрация данных по выбранному часу
export const getProductsForHour = (
  hour: string | undefined,
  dateRange: [Date | null, Date | null]
) => {
  if (!hour || !dateRange[0]) return []; // Если hour или startDate не переданы, возвращаем пустой массив

  const [startHour, endHour] = hour
    .split("-")
    .map((h) => parseInt(h.split(":")[0], 10)); // Разделяем час и минуты
  const start = startHour * 60; // Начало интервала в минутах
  const end = endHour * 60 + 59; // Конец интервала в минутах (59 минут)

  const startDate = dateRange[0].toDateString(); // Преобразуем дату только один раз

  return initialData.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const itemMinutes = itemDate.getHours() * 60 + itemDate.getMinutes();

    // Проверяем попадание в интервал по времени и дате
    return (
      itemMinutes >= start &&
      itemMinutes <= end &&
      itemDate.toDateString() === startDate
    );
  });
};
