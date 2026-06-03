import { Package } from "lucide-react";

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>
                </div>

                <div className="p-3 bg-indigo-100 rounded-2xl">
                    <Package className="text-indigo-600" />
                </div>
            </div>
        </div>
    );
}

export default StatCard;