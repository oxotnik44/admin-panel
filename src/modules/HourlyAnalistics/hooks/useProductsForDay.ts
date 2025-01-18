import { initialData } from "src/modules/SummarizedAnalytics/utils/initialData";

// Фильтрация данных по выбранному часу или диапазону дат
export const getProductsForHour = (
  hour: string | undefined,
  dateRange: [Date | null, Date | null]
) => {
  if (!dateRange[0]) return []; // Если начальная дата не указана, возвращаем пустой массив

  const startDate = dateRange[0];
  const endDate = dateRange[1] ?? dateRange[0]; // Если конечная дата не указана, используем начальную

  // Если диапазон на один день
  if (startDate.toDateString() === endDate.toDateString()) {
    if (!hour) return []; // Если hour не передан, возвращаем пустой массив

    const [startHour, endHour] = hour
      .split("-")
      .map((h) => parseInt(h.split(":")[0], 10)); // Разделяем часы
    const start = startHour * 60; // Начало интервала в минутах
    const end = endHour * 60 + 59; // Конец интервала в минутах (59 минут)

    const dayString = startDate.toDateString(); // Дата в строковом формате

    // Фильтруем данные по времени
    return initialData.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const itemMinutes = itemDate.getHours() * 60 + itemDate.getMinutes();

      // Проверяем попадание в интервал по времени и дате
      return (
        itemMinutes >= start &&
        itemMinutes <= end &&
        itemDate.toDateString() === dayString
      );
    });
  }

  // Если выбран диапазон на несколько дней
  return initialData
    .filter((item) => {
      const itemDate = new Date(item.timestamp);
      console.log(itemDate);

      // Проверяем, попадает ли покупка в выбранный диапазон дат
      return itemDate >= startDate! && itemDate <= endDate!;
    })
    .map((item) => {
      const itemDate = new Date(item.timestamp);
      // Возвращаем каждую покупку с нужными данными
      return {
        timestamp: itemDate.toLocaleTimeString("ru-RU"), // Временной момент покупки в формате HH:mm:ss
        name: item.name, // Название товара
        sold: item.sold, // Количество проданного
        price: item.price, // Цена за единицу
      };
    });
};
