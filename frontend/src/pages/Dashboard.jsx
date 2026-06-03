import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import StockChart from "../components/StockChart";

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/dashboard/stats")
            .then((res) => setStats(res.data))
            .catch(console.error);
    }, []);

    if (!stats) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="space-y-6">
            <Navbar />

            <div>
                <h1 className="text-4xl font-bold mb-8">
                    Inventory Dashboard
                </h1>

                <div className="grid grid-cols-3 gap-6">
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                    />

                    <StatCard
                        title="Total Stock"
                        value={stats.totalStock}
                    />

                    <StatCard
                        title="Low Stock"
                        value={stats.lowStockProducts}
                    />
                </div>
            </div>
            <StockChart />
            <ProductTable />
        </div>
    );
}

export default Dashboard;