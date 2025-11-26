import { Link } from "react-router-dom";
import axios from "axios";

export default function GameCard({ game }) {
    const token = localStorage.getItem("token");

    const addFav = async () => {
        await axios.post(
            "http://localhost:5000/api/favourites",
            { gameId: game.id || game._id },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Added to Favourites!");
    };

    const gameId = game.id || game._id;
    const imageUrl = game.image || game.background_image || "https://via.placeholder.com/400x300/1f2937/ffffff?text=No+Image";

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <Link to={`/game/${gameId}`} className="block relative overflow-hidden">
                <img
                    src={imageUrl}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    alt={game.title || game.name}
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300/1f2937/ffffff?text=No+Image";
                    }}
                />
            </Link>

            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-white mb-2">{game.title || game.name}</h3>
                
                {(game.rating || game.rating_top) && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-400 text-lg">⭐</span>
                        <span className="text-yellow-400 font-semibold">{game.rating || game.rating_top}/5</span>
                    </div>
                )}

                {token && (
                    <button
                        onClick={addFav}
                        className="bg-red-600 w-full px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        ❤️ Add to Favorites
                    </button>
                )}
            </div>
        </div>
    );
}
