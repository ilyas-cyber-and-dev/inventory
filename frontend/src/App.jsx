import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <main className="flex-1 p-6">
                <Dashboard />
            </main>
        </div>
    );
}

export default App;