import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../types/productTypes";
export const initialData: Product[] = [
  {
    name: "Товар 1",
    sold: 100,
    price: 200,
    total: 20000,
    timestamp: "2024-12-25T12:00:00", // Первый временной момент
  },
  {
    name: "Товар 1",
    sold: 50,
    price: 200,
    total: 10000,
    timestamp: "2024-12-25T13:30:00", // Второй временной момент
  },
  {
    name: "Товар 1",
    sold: 150,
    price: 200,
    total: 30000,
    timestamp: "2024-12-25T15:00:00", // Третий временной момент
  },
  {
    name: "Товар 1",
    sold: 75,
    price: 200,
    total: 15000,
    timestamp: "2024-12-25T16:45:00", // Четвертый временной момент
  },
  // Добавленные данные для "Товар 1"
  {
    name: "Товар 1",
    sold: 120,
    price: 200,
    total: 24000,
    timestamp: "2024-12-26T10:00:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 90,
    price: 200,
    total: 18000,
    timestamp: "2024-12-26T14:00:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 60,
    price: 200,
    total: 12000,
    timestamp: "2024-12-27T11:30:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 150,
    price: 200,
    total: 30000,
    timestamp: "2024-12-27T17:45:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 200,
    price: 200,
    total: 40000,
    timestamp: "2024-12-28T09:00:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 80,
    price: 200,
    total: 16000,
    timestamp: "2024-12-28T13:30:00", // Новый день
  },
  {
    name: "Товар 1",
    sold: 140,
    price: 200,
    total: 28000,
    timestamp: "2024-12-29T16:00:00", // Новый день
  },
  {
    name: "Товар 2",
    sold: 50,
    price: 150,
    total: 7500,
    timestamp: "2024-12-18T08:30:00",
  },
  {
    name: "Товар 2",
    sold: 60,
    price: 150,
    total: 9000,
    timestamp: "2024-12-22T08:30:00",
  },
  {
    name: "Товар 2",
    sold: 200,
    price: 150,
    total: 30000,
    timestamp: "2024-12-24T14:00:00",
  },
  {
    name: "Товар 2",
    sold: 90,
    price: 150,
    total: 13500,
    timestamp: "2024-12-21T11:00:00",
  },
  {
    name: "Товар 3",
    sold: 30,
    price: 300,
    total: 9000,
    timestamp: "2024-12-15T14:45:00",
  },
  {
    name: "Товар 3",
    sold: 40,
    price: 300,
    total: 12000,
    timestamp: "2024-12-20T15:00:00",
  },
  {
    name: "Товар 3",
    sold: 50,
    price: 300,
    total: 15000,
    timestamp: "2024-12-21T10:00:00",
  },
  {
    name: "Товар 3",
    sold: 200,
    price: 300,
    total: 60000,
    timestamp: "2024-12-23T14:45:00",
  },
  {
    name: "Товар 4",
    sold: 10,
    price: 400,
    total: 4000,
    timestamp: "2024-12-18T09:00:00",
  },
  {
    name: "Товар 4",
    sold: 150,
    price: 400,
    total: 60000,
    timestamp: "2024-12-22T16:00:00",
  },
  {
    name: "Товар 4",
    sold: 100,
    price: 400,
    total: 40000,
    timestamp: "2024-12-25T09:30:00",
  },
  {
    name: "Товар 5",
    sold: 90,
    price: 500,
    total: 45000,
    timestamp: "2024-12-23T11:30:00",
  },
  {
    name: "Товар 5",
    sold: 300,
    price: 500,
    total: 150000,
    timestamp: "2024-12-24T10:00:00",
  },
  {
    name: "Товар 6",
    sold: 100,
    price: 350,
    total: 35000,
    timestamp: "2024-12-15T13:30:00",
  },
  {
    name: "Товар 6",
    sold: 50,
    price: 350,
    total: 17500,
    timestamp: "2024-12-21T14:00:00",
  },
  {
    name: "Товар 6",
    sold: 70,
    price: 350,
    total: 24500,
    timestamp: "2024-12-20T14:30:00",
  },
  {
    name: "Товар 7",
    sold: 60,
    price: 250,
    total: 15000,
    timestamp: "2024-12-23T10:00:00",
  },
  {
    name: "Товар 7",
    sold: 100,
    price: 250,
    total: 25000,
    timestamp: "2024-12-19T09:15:00",
  },
  {
    name: "Товар 7",
    sold: 150,
    price: 250,
    total: 37500,
    timestamp: "2024-12-25T08:00:00",
  },
];

export const allColumns: ColumnDef<Product>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Название товара",
    cell: (info) => info.getValue(),
  },
  {
    id: "sold",
    accessorKey: "sold",
    header: "Количество проданных штук",
    cell: (info) => info.getValue(),
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Цена продажи",
    cell: (info) => `₽ ${info.getValue()}`,
  },
  {
    id: "total",
    accessorKey: "total",
    header: "Сумма",
    cell: (info) => `₽ ${info.getValue()}`,
  },
];
