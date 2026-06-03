import { useEffect, useState } from "react";
import api from "../services/api";

function ProductTable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((res) => setProducts(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-xl mb-4">
                Recent Products
            </h2>

            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">SKU</th>
                        <th className="text-left p-3">Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b">
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.sku}</td>
                            <td className="p-3">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;