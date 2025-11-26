import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

export default function Favourites() {
    const [games, setGames] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/favourites", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setGames(res.data));
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">My Favourites ❤️</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {games.map((g) => (
                    <GameCard key={g._id} game={g} />
                ))}
            </div>
        </div>
    );
}
