import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from "../../utils/axios";
import requests from '../../utils/requests';
import { API_KEY } from '../../utils/requests';
import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Define the truncateParagraph function outside the component
function truncateParagraph(paragraph) {
    if (!paragraph) return ''; // Handle null case
    const words = paragraph.split(' ');
    if (words.length <= 10) {
        return paragraph;
    }
    const truncatedWords = words.slice(0, 10);
    return truncatedWords.join(' ') + '...';
}

function Banner() {
    const [movie, setMovie] = useState();
    const [trailer, setTrailer] = useState();
    const [showVideo,setShowVideo]=useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(requests.fetchTrending);
                if (isMounted) {
                    setMovie(response.data.results[
                        Math.floor(Math.random() * response.data.results.length)
                    ]);
                }
            } catch (error) {
                console.log("Error in fetching API", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    console.log(movie);

    const handleClick = async (id) => {
        try {
            console.log(id);
            const response = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}`);
            const trailers = response.data.results.filter(video => video.type === "Trailer");
            if (trailers.length > 0) {
                setTrailer(trailers[0].key);
            } else {
                setTrailer('');
                console.log("No trailer available for this movie.");
            }
        } catch (error) {
            console.log("Error fetching trailer:", error);
        }
    };
    
    const handleCloseVideo = () => {
      setShowVideo(false); // Hide the video
  };
    return (
        <div
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className='banner-title'>
                <h1>{movie?.title}</h1>
            </div>
            <div className='banner-buttons'>
                <button className='play' onClick={() => handleClick(movie?.id)}>Play</button>
                <button>Next</button>
            </div>
            <div className='banner-description'>
                <p>{truncateParagraph(movie?.overview)}</p>
            </div>
            {showVideo && trailer && (
                    <div className="video-container">
                        <YouTube videoId={trailer} opts={{ height: '360', width: '640' }} origin={'http://localhost:3000'} />
                        <div className="close-video-button-container">
                            <IconButton className="close-video-button" onClick={handleCloseVideo}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                )}

            <div className='banner-fadeBottom'></div>
        </div>
    );
}

export default Banner;
