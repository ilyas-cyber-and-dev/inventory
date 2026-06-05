const db = require("../config/db");

const getStats = async (req, res) => {
    try {
        const [[totalProducts]] = await db.execute("SELECT COUNT(*) as totalProducts FROM products");
        const [[totalStock]] = await db.execute("SELECT COALESCE(SUM(stock), 0) as totalStock FROM products");
        const [[lowStockProducts]] = await db.execute("SELECT COUNT(*) as lowStockProducts FROM products WHERE stock < 10");
        res.json({
            totalProducts: totalProducts.totalProducts,
            totalStock: totalStock.totalStock,
            lowStockProducts: lowStockProducts.lowStockProducts,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getAnalytics = async (req, res) => {
    try {
        // Stock per product (for bar chart)
        const [stockPerProduct] = await db.execute(
            "SELECT name, stock, price FROM products ORDER BY stock DESC LIMIT 20"
        );

        // Stock distribution (for pie chart)
        const [[highStock]] = await db.execute(
            "SELECT COUNT(*) as count FROM products WHERE stock >= 50"
        );
        const [[mediumStock]] = await db.execute(
            "SELECT COUNT(*) as count FROM products WHERE stock >= 10 AND stock < 50"
        );
        const [[lowStock]] = await db.execute(
            "SELECT COUNT(*) as count FROM products WHERE stock < 10"
        );

        const stockDistribution = [
            { category: "High Stock (≥50)", count: highStock.count },
            { category: "Medium (10-49)", count: mediumStock.count },
            { category: "Low Stock (<10)", count: lowStock.count },
        ];

        // Price range distribution (for area/bar chart)
        const [priceData] = await db.execute(
            "SELECT name, price, stock FROM products ORDER BY price ASC LIMIT 20"
        );

        // Summary stats
        const [[avgPrice]] = await db.execute(
            "SELECT ROUND(AVG(price), 2) as avgPrice FROM products"
        );
        const [[maxStock]] = await db.execute(
            "SELECT name, stock FROM products ORDER BY stock DESC LIMIT 1"
        );
        const [[minStock]] = await db.execute(
            "SELECT name, stock FROM products WHERE stock > 0 ORDER BY stock ASC LIMIT 1"
        );

        res.json({
            stockPerProduct,
            stockDistribution,
            priceData,
            summary: {
                avgPrice: avgPrice.avgPrice || 0,
                highestStock: maxStock || { name: "-", stock: 0 },
                lowestStock: minStock || { name: "-", stock: 0 },
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getStats, getAnalytics };