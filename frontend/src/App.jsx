import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/*"
                    element={
                                <div className="flex h-screen bg-slate-100 overflow-hidden">
                            <Sidebar />

                            <main className="flex-1 p-8 overflow-y-auto">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path="/products"
                                        element={
                                            <ProtectedRoute>
                                                <Products />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path="/analytics"
                                        element={
                                            <ProtectedRoute>
                                                <Analytics />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path="/settings"
                                        element={
                                            <ProtectedRoute>
                                                <SettingsPage />
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </main>
                        </div>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;