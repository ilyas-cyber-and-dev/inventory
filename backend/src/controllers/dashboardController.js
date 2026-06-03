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
module.exports = { getStats };