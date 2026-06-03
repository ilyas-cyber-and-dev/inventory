import {
    LayoutDashboard,
    Package,
    BarChart3,
    Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-72 bg-white border-r min-h-screen p-6">
            <h1 className="text-2xl font-bold text-blue-600">
                InventoryFlow
            </h1>

            <nav className="mt-10 space-y-2">

                <Link
                    to="/"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/products"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                >
                    <Package size={18} />
                    <span>Products</span>
                </Link>

                <Link
                    to="/analytics"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                >
                    <BarChart3 size={18} />
                    <span>Analytics</span>
                </Link>

                <Link
                    to="/settings"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </Link>

            </nav>
        </aside>
    );
}

export default Sidebar;