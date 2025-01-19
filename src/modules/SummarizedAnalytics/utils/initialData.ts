import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../types/productTypes";
export const initialData: Product[] = [
  {
    name: "Брецель Дог",
    sold: 50,
    price: 99.99,
    total: 4999.5,
    timestamp: "2024-12-25T12:00:00",
    residue: 400,
  },
  {
    name: "Брецель Дог",
    sold: 25,
    price: 99.99,
    total: 2499.75,
    timestamp: "2024-12-25T13:30:00",
    residue: 375,
  },
  {
    name: "Брецель Дог",
    sold: 75,
    price: 99.99,
    total: 7499.25,
    timestamp: "2024-12-25T15:00:00",
    residue: 300,
  },
  {
    name: "Брецель Дог",
    sold: 37,
    price: 99.99,
    total: 3699.63,
    timestamp: "2024-12-25T16:45:00",
    residue: 262,
  },
  {
    name: "Пекан кленовый",
    sold: 100,
    price: 79.99,
    total: 7999,
    timestamp: "2024-12-25T09:30:00",
    residue: 300,
  },
  {
    name: "Пекан кленовый",
    sold: 25,
    price: 79.99,
    total: 1999.75,
    timestamp: "2024-12-25T10:30:00",
    residue: 275,
  },
  {
    name: "Самса с курицей",
    sold: 50,
    price: 69.99,
    total: 3499.5,
    timestamp: "2024-12-25T11:00:00",
    residue: 350,
  },
  {
    name: "Плетенка с кунжутом",
    sold: 50,
    price: 79.0,
    total: 3950,
    timestamp: "2024-12-25T14:00:00",
    residue: 225,
  },
  {
    name: "Чиабатта",
    sold: 100,
    price: 96.0,
    total: 9600,
    timestamp: "2024-12-25T08:00:00",
    residue: 375,
  },
  {
    name: "Багет ФИТНЕС",
    sold: 75,
    price: 79.99,
    total: 5999.25,
    timestamp: "2024-12-25T15:30:00",
    residue: 175,
  },
  {
    name: "Хлеб ДЕРЕВЕНСКИЙ",
    sold: 40,
    price: 119.0,
    total: 4760,
    timestamp: "2024-12-25T17:00:00",
    residue: 125,
  },
  {
    name: "Пекан кленовый",
    sold: 100,
    price: 79.99,
    total: 7999,
    timestamp: "2024-12-24T14:00:00",
    residue: 245,
  },
  {
    name: "Плетенка с кунжутом",
    sold: 50,
    price: 79.0,
    total: 3950,
    timestamp: "2024-12-25T09:30:00",
    residue: 200,
  },
  {
    name: "Чиабатта",
    sold: 150,
    price: 96.0,
    total: 14400,
    timestamp: "2024-12-24T10:00:00",
    residue: 180,
  },
  {
    name: "Хлеб ДЕРЕВЕНСКИЙ",
    sold: 50,
    price: 119.0,
    total: 5950,
    timestamp: "2024-12-24T12:00:00",
    residue: 100,
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
