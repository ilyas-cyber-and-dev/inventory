function Navbar() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold">
                    Dashboard Overview
                </h2>

                <p className="text-slate-500">
                    Welcome back
                </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-indigo-500"></div>
        </div>
    );
}

export default Navbar;