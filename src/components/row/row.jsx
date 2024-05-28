import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import './row.css';

const Row = ({ title, fetchurl, isLarge }) => {
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(fetchurl);
                console.log(response.data);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error in fetching requests", error);
            }
        };

        fetchData();
    }, [fetchurl]);

    const handleClick = (movie) => {
        // Handle the click event to fetch and play the trailer
        console.log(movie);
    };

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row-posters">
                {movies?.map((movie) => (
                    <img
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/original${ movie?.poster_path }`}
                        alt={movie.title}
                        onClick={() => handleClick(movie)}
                        className={`row-poster ${isLarge && "row-posterLarge"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Row;
