import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-slate-100">
                <Sidebar />

                <main className="flex-1 p-8">
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/products"
                            element={<Products />}
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;