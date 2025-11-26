import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post("http://localhost:5000/api/auth/login", { email, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/");
            })
            .catch(() => alert("Invalid Credentials"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎮</div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        GameVerse
                    </h1>
                    <p className="text-gray-400">Welcome back, gamer!</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input 
                            className="bg-gray-700 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="your@email.com" 
                            type="email"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input 
                            className="bg-gray-700 p-3 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            type="password" 
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button 
                        onClick={handleLogin} 
                        className="bg-blue-600 w-full p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
