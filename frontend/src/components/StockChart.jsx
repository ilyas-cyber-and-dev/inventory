import { useEffect, useState } from "react";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

const chartConfig = {
    stock: {
        label: "Stock",
        color: "var(--color-chart-1)",
    },
};

function StockChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then((res) => {
                const chartData = res.data
                    .sort((a, b) => b.stock - a.stock)
                    .slice(0, 8)
                    .map((p) => ({
                        name: p.name,
                        stock: p.stock,
                    }));
                setData(chartData);
            })
            .catch(console.error);
    }, []);

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-500" />
                    <CardTitle>Inventory Overview</CardTitle>
                </div>
                <CardDescription>
                    Top products by stock level
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart
                        data={data}
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
                <TrendingUp className="h-4 w-4 mr-1" />
                Showing top {data.length} products
            </CardFooter>
        </Card>
    );
}

export default StockChart;