import { useState } from "react";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                res.data.token
            );

            window.location.href = "/";
        } catch (error) {
            alert("Login gagal");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-2xl shadow w-[400px]">
                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
