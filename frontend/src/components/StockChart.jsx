import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const data = [
    { name: "Products", value: 1 },
    { name: "Stock", value: 15 },
];

function StockChart() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">
                Inventory Analytics
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockChart;