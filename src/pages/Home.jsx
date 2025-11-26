import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

export default function Home() {
    const [games, setGames] = useState([]);
    const [type, setType] = useState("local");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchGames = () => {
        setLoading(true);
        let url =
            type === "local"
                ? "http://localhost:5000/api/games"
                : `http://localhost:5000/api/rawg/${type}`;

        axios
            .get(url, { params: { search, page_size: 40 } })
            .then((res) => {
                setGames(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchGames();
        }, 500);
        return () => clearTimeout(timer);
    }, [type, search]);

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold text-white mb-2">
                    🎮 GameVerse
                </h1>
                <p className="text-gray-400">Discover your next favorite game</p>
            </div>

            {/* Search & Filters */}
            <div className="mb-6 space-y-4">
                <input
                    type="text"
                    placeholder="🔍 Search games..."
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                    <button 
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            type === "local" 
                                ? "bg-blue-600 hover:bg-blue-700" 
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() => setType("local")}
                    >
                        📚 My DB
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            type === "trending" 
                                ? "bg-purple-600 hover:bg-purple-700" 
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() => setType("trending")}
                    >
                        🔥 Trending
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            type === "upcoming" 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() => setType("upcoming")}
                    >
                        🚀 Upcoming
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                            type === "top-rated" 
                                ? "bg-yellow-600 hover:bg-yellow-700" 
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() => setType("top-rated")}
                    >
                        ⭐ Top Rated
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col justify-center items-center py-20">
                    <div className="animate-spin text-6xl mb-4">🎮</div>
                    <div className="text-2xl text-gray-300">Loading games...</div>
                </div>
            )}

            {/* Games Grid */}
            {!loading && games.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map((g) => (
                        <GameCard key={g.id || g._id} game={g} />
                    ))}
                </div>
            )}

            {/* No Results */}
            {!loading && games.length === 0 && (
                <div className="flex flex-col justify-center items-center py-20">
                    <div className="text-6xl mb-4">😔</div>
                    <div className="text-xl text-gray-400">No games found</div>
                </div>
            )}
        </div>
    );
}
