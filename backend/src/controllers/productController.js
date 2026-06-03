const db = require("../config/db");
const getProducts = async (req, res) => {
    try {
        const [products] = await db.execute(
            "SELECT * FROM products ORDER BY id DESC"
        );

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [products] = await db.execute(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(products[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, sku, description, price, stock } = req.body;

        const [result] = await db.execute(
            `INSERT INTO products
      (name, sku, description, price, stock)
      VALUES (?, ?, ?, ?, ?)`,
            [name, sku, description, price, stock]
        );

        res.status(201).json({
            success: true,
            productId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sku, description, price, stock } = req.body;

        await db.execute(
            `UPDATE products
       SET name = ?, sku = ?, description = ?, price = ?, stock = ?
       WHERE id = ?`,
            [name, sku, description, price, stock, id]
        );

        res.status(200).json({
            success: true,
            message: "Product updated",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};