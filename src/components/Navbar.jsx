import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex justify-between bg-gray-900 p-4 mb-6 rounded-lg">
            <Link to="/" className="text-green-400 font-bold text-xl">
                🎮 GameVerse
            </Link>

            <div className="flex gap-4 items-center">
                {token ? (
                    <>
                        <Link to="/favourites">❤️ Favourites</Link>
                        <button onClick={logout} className="text-red-400">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-400">Login</Link>
                        <Link to="/register" className="text-green-400">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}
