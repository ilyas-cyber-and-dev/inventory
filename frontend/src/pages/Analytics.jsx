import { useEffect, useState } from "react";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    RadialBarChart,
    RadialBar,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    TrendingUp,
    TrendingDown,
    Package,
    BarChart3,
    PieChart as PieChartIcon,
    Activity,
} from "lucide-react";
import Navbar from "../components/Navbar";

const PIE_COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
];

const barChartConfig = {
    stock: {
        label: "Stock",
        color: "var(--color-chart-1)",
    },
};

const pieChartConfig = {
    count: {
        label: "Products",
    },
    "High Stock (≥50)": {
        label: "High Stock (≥50)",
        color: "var(--color-chart-1)",
    },
    "Medium (10-49)": {
        label: "Medium (10-49)",
        color: "var(--color-chart-2)",
    },
    "Low Stock (<10)": {
        label: "Low Stock (<10)",
        color: "var(--color-chart-3)",
    },
};

const priceChartConfig = {
    price: {
        label: "Price (Rp)",
        color: "var(--color-chart-4)",
    },
    stock: {
        label: "Stock",
        color: "var(--color-chart-2)",
    },
};

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/dashboard/analytics")
            .then((res) => {
                setAnalytics(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="text-slate-500 text-lg">Loading analytics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="space-y-6">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <p className="text-slate-500 text-lg">Failed to load analytics data.</p>
                </div>
            </div>
        );
    }

    const { stockPerProduct, stockDistribution, priceData, summary } = analytics;

    // Prepare pie data with fill colors
    const pieData = stockDistribution.map((item, index) => ({
        ...item,
        fill: PIE_COLORS[index % PIE_COLORS.length],
    }));

    const totalPieProducts = stockDistribution.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="space-y-6">
            <Navbar />

            <div>
                <h1 className="text-4xl font-bold mb-2">
                    Inventory Analytics
                </h1>
                <p className="text-slate-500 mb-8">
                    Comprehensive overview of your inventory performance
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Average Price
                        </CardTitle>
                        <Activity className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-indigo-700">
                            Rp {Number(summary.avgPrice).toLocaleString("id-ID")}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            Across all products
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Highest Stock
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-700">
                            {summary.highestStock.stock} units
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            {summary.highestStock.name}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Lowest Stock
                        </CardTitle>
                        <TrendingDown className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-700">
                            {summary.lowestStock.stock} units
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            {summary.lowestStock.name}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Stock per Product */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-indigo-500" />
                            <CardTitle>Stock per Product</CardTitle>
                        </div>
                        <CardDescription>
                            Current inventory levels for each product
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                            <BarChart
                                data={stockPerProduct}
                                margin={{ top: 5, right: 10, left: 10, bottom: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    axisLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    fontSize={11}
                                    interval={0}
                                    height={60}
                                />
                                <YAxis tickLine={false} axisLine={false} />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="stock"
                                    fill="var(--color-stock)"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                        <Package className="h-4 w-4 mr-1" />
                        Showing top {stockPerProduct.length} products by stock
                    </CardFooter>
                </Card>

                {/* Pie Chart - Stock Distribution */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <PieChartIcon className="h-5 w-5 text-indigo-500" />
                            <CardTitle>Stock Distribution</CardTitle>
                        </div>
                        <CardDescription>
                            Products grouped by stock level
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={pieChartConfig}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={pieData}
                                    dataKey="count"
                                    nameKey="category"
                                    innerRadius={60}
                                    outerRadius={100}
                                    strokeWidth={3}
                                    stroke="var(--color-background)"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Pie>
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="category" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Total {totalPieProducts} products tracked
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Charts Row 2 - Full Width Area Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-indigo-500" />
                        <CardTitle>Price & Stock Overview</CardTitle>
                    </div>
                    <CardDescription>
                        Price and stock comparison across products (sorted by price)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={priceChartConfig} className="h-[300px] w-full">
                        <AreaChart
                            data={priceData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                angle={-45}
                                textAnchor="end"
                                fontSize={11}
                                interval={0}
                                height={60}
                            />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <defs>
                                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-stock)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-stock)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="var(--color-price)"
                                fill="url(#fillPrice)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="stock"
                                stroke="var(--color-stock)"
                                fill="url(#fillStock)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Products sorted by price from lowest to highest
                </CardFooter>
            </Card>
        </div>
    );
}

export default Analytics;
