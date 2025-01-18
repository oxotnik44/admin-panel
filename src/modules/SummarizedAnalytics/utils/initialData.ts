import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../types/productTypes";

export const initialData: Product[] = [
  {
    name: "Товар 1",
    sold: 100,
    price: 200,
    total: 20000,
    timestamp: "2024-12-25T12:00:00", // Первый временной момент
    residue: 800, // Наибольший остаток
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
  {
    name: "Товар 2",
    sold: 200,
    price: 150,
    total: 30000,
    timestamp: "2024-12-25T09:30:00",
    residue: 600, // Наибольший остаток среди товаров с 25 декабря
  },
  {
    name: "Товар 2",
    sold: 50,
    price: 150,
    total: 7500,
    timestamp: "2024-12-25T10:30:00",
  },
  {
    name: "Товар 3",
    sold: 100,
    price: 300,
    total: 30000,
    timestamp: "2024-12-25T11:00:00",
    residue: 700,
  },
  {
    name: "Товар 4",
    sold: 100,
    price: 400,
    total: 40000,
    timestamp: "2024-12-25T14:00:00",
  },
  {
    name: "Товар 5",
    sold: 200,
    price: 500,
    total: 100000,
    timestamp: "2024-12-25T08:00:00",
    residue: 750, // Наибольший остаток среди всех товаров
  },
  {
    name: "Товар 6",
    sold: 150,
    price: 350,
    total: 52500,
    timestamp: "2024-12-25T15:30:00",
    residue: 350,
  },
  {
    name: "Товар 7",
    sold: 80,
    price: 250,
    total: 20000,
    timestamp: "2024-12-25T17:00:00",
    residue: 250,
  },

  {
    name: "Товар 2",
    sold: 200,
    price: 150,
    total: 30000,
    timestamp: "2024-12-24T14:00:00",
    residue: 490,
  },

  {
    name: "Товар 4",
    sold: 100,
    price: 400,
    total: 40000,
    timestamp: "2024-12-25T09:30:00",
    residue: 400,
  },

  {
    name: "Товар 5",
    sold: 300,
    price: 500,
    total: 150000,
    timestamp: "2024-12-24T10:00:00",
    residue: 360,
  },

  {
    name: "Товар 7",
    sold: 100,
    price: 250,
    total: 25000,
    timestamp: "2024-12-24T12:00:00",
    residue: 200,
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
    header: "Количество (шт.)",
    cell: (info) => info.getValue(),
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Цена (₽)",
    cell: (info) => ` ${info.getValue()}`,
  },
  {
    id: "total",
    accessorKey: "total",
    header: "Сумма (₽)",
    cell: (info) => ` ${info.getValue()}`,
  },
];
