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

        if (!name || !sku || price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "Name, SKU, and Price are required fields.",
            });
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid number.",
            });
        }

        const parsedStock = stock === "" || stock === undefined || stock === null ? 0 : parseInt(stock, 10);
        if (isNaN(parsedStock)) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a valid integer.",
            });
        }

        const [result] = await db.execute(
            `INSERT INTO products
      (name, sku, description, price, stock)
      VALUES (?, ?, ?, ?, ?)`,
            [name, sku, description || null, parsedPrice, parsedStock]
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

        if (!name || !sku || price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "Name, SKU, and Price are required fields.",
            });
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid number.",
            });
        }

        const parsedStock = stock === "" || stock === undefined || stock === null ? 0 : parseInt(stock, 10);
        if (isNaN(parsedStock)) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a valid integer.",
            });
        }

        await db.execute(
            `UPDATE products
       SET name = ?, sku = ?, description = ?, price = ?, stock = ?
       WHERE id = ?`,
            [name, sku, description || null, parsedPrice, parsedStock, id]
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