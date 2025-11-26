import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/api/rawg/game/${id}`)
            .then((res) => {
                setGame(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching game:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl">Loading...</p>
        </div>
    );

    if (!game) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl">Game not found</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Hero Image */}
            <img 
                src={game.background_image || "https://via.placeholder.com/1200x400/1f2937/ffffff?text=No+Image"} 
                alt={game.name}
                className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/1200x400/1f2937/ffffff?text=No+Image";
                }}
            />

            {/* Game Info */}
            <div className="mt-6">
                <h1 className="text-4xl font-bold">{game.name}</h1>
                
                <div className="flex gap-4 mt-3 text-lg">
                    <p className="text-yellow-400">⭐ {game.rating}/5</p>
                    {game.metacritic && (
                        <p className="text-green-400">Metacritic: {game.metacritic}</p>
                    )}
                    <p className="text-gray-400">Released: {game.released}</p>
                </div>

                {/* Genres */}
                {game.genres && game.genres.length > 0 && (
                    <div className="mt-4">
                        <div className="flex gap-2 flex-wrap">
                            {game.genres.map((genre, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Platforms */}
                {game.platforms && game.platforms.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Available on:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {game.platforms.map((platform, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 bg-gray-700 rounded-lg text-sm"
                                >
                                    {platform.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                {game.description && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold mb-3">About</h3>
                        <p className="text-gray-300 leading-relaxed">{game.description}</p>
                    </div>
                )}

                {/* Download/Buy Links */}
                {game.stores && game.stores.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">🎮 Get This Game</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {game.stores.map((store) => (
                                <a
                                    key={store.id}
                                    href={store.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    <span className="font-semibold text-lg">{store.name}</span>
                                    <span className="text-2xl">→</span>
                                </a>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm mt-3">
                            * Click on any store to visit and download/purchase the game
                        </p>
                    </div>
                )}

                {/* Official Website */}
                {game.website && (
                    <div className="mt-6">
                        <a
                            href={game.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                        >
                            🌐 Visit Official Website
                        </a>
                    </div>
                )}

                {/* Developers & Publishers */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {game.developers && game.developers.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Developers</h4>
                            <p className="text-gray-300">{game.developers.join(", ")}</p>
                        </div>
                    )}
                    {game.publishers && game.publishers.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Publishers</h4>
                            <p className="text-gray-300">{game.publishers.join(", ")}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
