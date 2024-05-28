import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from "../../utils/axios"
import requests from '../../utils/requests';

function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    let isMounted = true; // To avoid setting state if component is unmounted

    const fetchData = async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        console.log(response)
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
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);
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
        <h1>{movie?.name}</h1>
      </div>
      <div className='banner-buttons'>
        <button className='play'>Play</button>
        <button>Next</button>
      </div>
      <div className='banner-description'>
        <p>{(movie?.overview)}</p>
      </div>
      <div className='banner-fadeBottom'>

      </div>
    </div >
  );
}

export default Banner;
