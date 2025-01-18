import React from "react";

interface ProductDetailsTableProps {
  products: any[]; // Возможно, стоит уточнить тип для better TypeScript поддержки
  isSingleDaySelected: boolean | null;
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({
  products,
  isSingleDaySelected,
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200 mb-8">
      <thead className="bg-gray-100 text-black">
        <tr>
          {!isSingleDaySelected && (
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Время покупки
            </th>
          )}
          <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
            Название товара
          </th>
          <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
            Количество
          </th>
          <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
            Цена
          </th>
          {isSingleDaySelected && (
            <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
              Сумма
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {products.map((product, idx) => (
          <tr key={idx}>
            {!isSingleDaySelected && (
              <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
                {product.timestamp}
              </th>
            )}
            <td className="border border-gray-300 p-4 text-sm text-black">
              {product.name}
            </td>
            <td className="border border-gray-300 p-4 text-sm text-black">
              {product.sold}
            </td>
            <td className="border border-gray-300 p-4 text-sm text-black">
              {product.price}
            </td>
            {isSingleDaySelected && (
              <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
                {product.total}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductDetailsTable;
