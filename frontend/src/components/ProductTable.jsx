import { useEffect, useState } from "react";
import api from "../services/api";

function ProductTable() {
    const [products, setProducts] = useState([]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);

            setProducts((prev) =>
                prev.filter(
                    (product) => product.id !== id
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        api.get("/products")
            .then((res) => setProducts(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">
                    Recent Products
                </h2>

                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Add Product
                </button>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-slate-50">
                    <tr className="border-b">
                        <th className="text-left p-3">
                            Name
                        </th>

                        <th className="text-left p-3">
                            SKU
                        </th>

                        <th className="text-left p-3">
                            Stock
                        </th>

                        <th className="text-left p-3">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="p-3">
                                {product.name}
                            </td>

                            <td className="p-3">
                                {product.sku}
                            </td>

                            <td className="p-3">
                                {product.stock}
                            </td>

                            <td className="p-3">
                                <div className="flex gap-2">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product.id
                                            )
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;