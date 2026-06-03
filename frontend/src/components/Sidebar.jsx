import {
    LayoutDashboard,
    Package,
    BarChart3,
    Settings
} from "lucide-react";

function Sidebar() {
    return (
        <aside className="w-72 bg-white border-r min-h-screen p-6">
            <h1 className="text-2xl font-bold text-blue-600">
                InventoryFlow
            </h1>

            <nav className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </div>

                <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span>Products</span>
                </div>

                <div className="flex items-center gap-3">
                    <BarChart3 size={18} />
                    <span>Analytics</span>
                </div>

                <div className="flex items-center gap-3">
                    <Settings size={18} />
                    <span>Settings</span>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;