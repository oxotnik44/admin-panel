interface ProductDetailsTableProps {
  products: any[];
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({
  products,
}) => (
  <table className="table-auto w-full border-collapse border border-gray-200 mb-8">
    <thead className="bg-gray-100 text-black">
      <tr>
        <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
          Название товара
        </th>
        <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
          Количество
        </th>
        <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
          Цена
        </th>
        <th className="border border-gray-300 p-4 text-left text-sm font-medium text-black">
          Сумма
        </th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, idx) => (
        <tr key={idx}>
          <td className="border border-gray-300 p-4 text-sm text-black">
            {product.name}
          </td>
          <td className="border border-gray-300 p-4 text-sm text-black">
            {product.sold}
          </td>
          <td className="border border-gray-300 p-4 text-sm text-black">
            {product.price}
          </td>
          <td className="border border-gray-300 p-4 text-sm text-black">
            {product.total}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductDetailsTable;
