import { useEffect, useState } from "react";
import api from "../services/api";

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        description: "",
        price: "",
        stock: "",
    });

    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        sku: "",
        description: "",
        price: "",
        stock: "",
    });

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
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };


    const handleCreateProduct = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                sku: formData.sku,
                description: formData.description || null,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock, 10),
            };

            const res = await api.post(
                "/products",
                payload
            );

            const newProduct = {
                id: res.data.productId,
                ...payload,
            };

            setProducts((prev) => [
                ...prev,
                newProduct,
            ]);

            setFormData({
                name: "",
                sku: "",
                description: "",
                price: "",
                stock: "",
            });

            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to add product");
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name || "",
            sku: product.sku || "",
            description: product.description || "",
            price: product.price !== undefined && product.price !== null ? product.price.toString() : "",
            stock: product.stock !== undefined && product.stock !== null ? product.stock.toString() : "",
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: editFormData.name,
                sku: editFormData.sku,
                description: editFormData.description || null,
                price: parseFloat(editFormData.price),
                stock: parseInt(editFormData.stock, 10),
            };

            await api.put(`/products/${editingProduct.id}`, payload);

            setProducts((prev) =>
                prev.map((p) =>
                    p.id === editingProduct.id
                        ? { ...p, ...payload }
                        : p
                )
            );

            setEditingProduct(null);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to update product");
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

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
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
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
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

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-[500px] shadow-xl">
                        <h2 className="text-xl font-bold mb-4">
                            Add Product
                        </h2>

                        <form
                            onSubmit={handleCreateProduct}
                            className="space-y-3"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                type="text"
                                placeholder="SKU"
                                className="w-full border p-2 rounded"
                                value={formData.sku}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        sku: e.target.value,
                                    })
                                }
                                required
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full border p-2 rounded"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                step="0.01"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                type="number"
                                placeholder="Stock"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={formData.stock}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        stock: e.target.value,
                                    })
                                }
                                required
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingProduct && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-[500px] shadow-xl">
                        <h2 className="text-xl font-bold mb-4">
                            Edit Product
                        </h2>

                        <form
                            onSubmit={handleUpdateProduct}
                            className="space-y-3"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                value={editFormData.name}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                type="text"
                                placeholder="SKU"
                                className="w-full border p-2 rounded"
                                value={editFormData.sku}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        sku: e.target.value,
                                    })
                                }
                                required
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full border p-2 rounded"
                                value={editFormData.description}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                step="0.01"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={editFormData.price}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        price: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                type="number"
                                placeholder="Stock"
                                min="0"
                                className="w-full border p-2 rounded"
                                value={editFormData.stock}
                                onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        stock: e.target.value,
                                    })
                                }
                                required
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingProduct(null)
                                    }
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductTable;