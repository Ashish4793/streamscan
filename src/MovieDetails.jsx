import React, { useCallback, useState, useEffect } from 'react';
import Logo from './logo.png';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [movieInfo, setMovieInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getStreamAvailability = useCallback(async () => {
    const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${id}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3f6809c016msh6e3cd334e82a504p1608e6jsn2e500d0c83ec',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovie(result.result);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const API_URL = 'https://www.omdbapi.com/?apikey=5cbd0352&i';
  const getMovieDetails = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}=${id}`);
      const data = await response.json();
      setMovieInfo(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getStreamAvailability(), getMovieDetails()]);
      setIsLoading(false); // Data fetching completed
    }
    fetchData();
  }, [getStreamAvailability, getMovieDetails]);

  if (isLoading) {
    return (
      <div className='text-center mt-5'>
        <h1 className="bold text-center mt-5"><img width={60} height={60} src={Logo} alt="logo" />StreamScan</h1>
        <p className="tagline text-center mt-7">"Find. Stream. Enjoy."</p>
        <SkeletonTheme baseColor="#202020" highlightColor="#8e8e8e">
    <h1 className='mt-5'>
      <Skeleton className='responsive-skeleton' width={window.innerWidth < 700 ? 300 : 700} height={50} count={6} />
    </h1>
  </SkeletonTheme>
      </div>
    );
  }

  if (!movie || movie.title === undefined) {
    return (
      <div className='text-center mt-5'>
        <h1 className="bold mt-5 text-center"><img width={60} height={60} src={Logo} alt="logo" />StreamScan</h1>
        <p className="tagline text-center mt-3">"Find. Stream. Enjoy."</p>
        <h1 style={{color : 'red'}} className='text-center mt-5'>Failed to fetch movie details. Please try again later.</h1>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className='text-center'>
    <a className='noUnderline' href="/">
    <h1 style={{margin:20}} className="text-center bold"><img width={60} height={60} src={Logo} alt="logo"/>
StreamScan</h1>
    </a>
<p className="tagline text-center mt-3">"Find. Stream. Enjoy."
</p>

      </div>
      <div className="container">
        <div className="shadow card movieCard mb-5" style={{width: '100%'}}>
          <div className="row g-0">
            <div className="col-sm-4 position-relative">
              <a target='_blank' rel='noreferrer' href={`https://www.imdb.com/title/${id}`}><img style={{width:300 , height : 300}} src={movieInfo.Poster} className="card-img h-100 w-100 " alt="..." />
              </a>
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <div>
                
                <h2 className="card-title text-center mt-2 mb-4 lightFont movieTitle display-5">
                  {movieInfo.Title} <br />
                </h2>
                {(() => {
                    const inputString = movieInfo.Awards;
                    const regex = /Won (\d+) Oscar(s?)/;
                    const match = inputString.match(regex);

                    if (match) {
                        const number = parseInt(match[1]);
                        const plural = match[2] === "s" ? "s" : "";
                        return (
                            <p className='lightFont'><img width="35" height="35" src="https://img.icons8.com/emoji/35/trophy-emoji.png" alt="trophy-emoji"/> Won {number} Oscar{plural}!</p>
                        );
                    }
                })()}
                <p className='plot lightFont'>{movieInfo.Plot}</p>
                
                {(movieInfo.Genre).split(', ').map((genre, index) => (
                <span className="badge pill rounded-pill bg-primary">{genre}</span>
                ))}
                <p className='lightFont' style={{float : 'right'}}><img width="50" height="30" src="../assets/img/imdb-icon.svg" alt="imdb"/> <br></br> {movieInfo.imdbRating}/10 </p>
                <p className='lightFont mt-4'>Release Date : {movieInfo.Released}</p>
                <p className='lightFont mt-3'>Directors : {movieInfo.Director}</p>
                <p className='lightFont mt-3'>Cast : {movieInfo.Actors}</p>
                {movieInfo && movieInfo.Type === 'series' && (
                <span className="badge pill rounded-pill bg-danger mt-2">Number of seasons : {movieInfo.totalSeasons}</span>)}
                <br></br>
                <h1 className='mt-4 lightFont avail'>Streaming Availability</h1>
  <div style={{ display: 'flex' }}>
    {movie && movie.streamingInfo && (
      Object.keys(movie.streamingInfo).length > 0 && Array.isArray(movie.streamingInfo.in) && movie.streamingInfo.in.length > 0 ? (
        (() => {
          const uniqueServices = new Set();
          return movie.streamingInfo.in.map((service) => {
            if (!uniqueServices.has(service.service)) {
              uniqueServices.add(service.service);
              return (
                <div className='flex' key={service.service}>
                  {service.service === 'prime' && (
                        <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="../assets/img/primevideo-color.svg" alt="amazon-prime-video"/></a>    )}
    {service.service === 'netflix' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="35" src="../assets/img/netflix-color.svg" alt="netflix"/></a>    )}
          {service.service === 'hotstar' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/fluency/48/disney-plus.png" alt="disney-hotstar"/></a>    )}
                {service.service === 'apple' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="../assets/img/appletv-color.svg" alt="apple-tv"/></a>    )}
      {service.service === 'zee5' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="40" height="40" src="https://www.zee5.com/images/ZEE5_logo.svg?ver=3.12.10" alt="zee5"/></a>    )}
                </div>
              );
            }
            return null; 
          });
        })()
      ) : (
        <p style={{color : 'red'}}>No streaming data available.</p>
      )
    )}
  </div>
                </div>
                                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
