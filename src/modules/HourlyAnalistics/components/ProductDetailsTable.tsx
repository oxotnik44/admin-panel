import React from "react";

interface ProductDetailsTableProps {
  products: any[]; // Возможно, стоит уточнить тип для better TypeScript поддержки
  isSingleDaySelected: boolean | null;
  productName: string | null;
  selectedView: string | undefined;
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({
  products,
  isSingleDaySelected,
  productName,
  selectedView,
}) => {
  let filteredProducts = isSingleDaySelected
    ? products.map((product) => ({
        ...product,
        timestamp: product.timestamp,
        name: product.name,
        sold: product.sold,
        price: product.price,
        total: product.total,
      })) // Если `isSingleDaySelected`, данные имеют "плоскую" структуру
    : selectedView === "product" && productName
    ? products
        .map((product) => ({
          ...product,
          items: Array.isArray(product.items)
            ? product.items.filter((item: any) => item.name === productName)
            : [], // Проверяем наличие items
        }))
        .filter((product) => product.items.length > 0) // Убираем продукты без items
    : products; // Если `isSingleDaySelected` = false и нет фильтрации, возвращаем `products`
  if (isSingleDaySelected && selectedView === "product") {
    // Фильтруем только те элементы, которые соответствуют productName
    filteredProducts = filteredProducts.filter((item) => {
      item.name === productName;
    });
  }
  if (!isSingleDaySelected && selectedView === "product") {
    let sum = 0;
    const b = filteredProducts;
    // Фильтруем только те элементы, которые соответствуют productName
    b.filter((item) => {
      // Проверяем, если имя товара совпадает с productName

      item.items.map((item: any) => {

        if (item.name === productName) {
          sum += item.sold * item.price;
        }
      });
      console.log(sum); // Выводим итоговую сумму

    });
  }

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
        {filteredProducts.map((product, idx) => (
          <React.Fragment key={idx}>
            {isSingleDaySelected ? (
              <tr>
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
            ) : (
              product.items.map((item: any, itemIdx: any) => (
                <tr key={itemIdx}>
                  <td className="border border-gray-300 p-4 text-sm text-black">
                    {item.timestamp}
                  </td>
                  <td className="border border-gray-300 p-4 text-sm text-black">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 p-4 text-sm text-black">
                    {item.sold}
                  </td>
                  <td className="border border-gray-300 p-4 text-sm text-black">
                    {item.price}
                  </td>
                </tr>
              ))
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProductDetailsTable;
