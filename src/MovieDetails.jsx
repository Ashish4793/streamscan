import React, { useCallback, useState, useEffect } from 'react';
import Logo from './logo.png';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const imageUrl = searchParams.get('imageUrl');

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

  const API_URL = 'http://www.omdbapi.com/?apikey=5cbd0352&i';
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
        <h1 className="bold mt-5"><img width={60} height={60} src={Logo} alt="logo" />StreamScan</h1>
        <p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."</p>
        <h1 className='text-center mt-5'>Please wait fetching data ...</h1>
      </div>
    );
  }

  if (!movie || movie.title === undefined) {
    return (
      <div className='text-center mt-5'>
        <h1 className="bold mt-5"><img width={60} height={60} src={Logo} alt="logo" />StreamScan</h1>
        <p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."</p>
        <h1 className='text-center mt-5'>Failed to fetch movie details. Please try again later.</h1>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className='text-center'>
    <a className='noUnderline' href="/">
    <h1 style={{margin:20}} className="bold"><img width={60} height={60} src={Logo} alt="logo"/>
StreamScan</h1>
    </a>
<p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."
</p>

      </div>
      <div className="container">
        <div className="shadow card movieCard mb-5" style={{width: '100%'}}>
          <div className="row g-0">
            <div className="col-sm-4 position-relative">
              <a href={movieInfo.Poster}><img style={{width:300 , height : 300}} src={imageUrl} className="card-img h-100 w-100 " alt="..." />
              </a>
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <div>
                <h2 className="card-title text-center mb-3 lightFont plot movieTitle display-5">
                  {movieInfo.Title} <br />
                </h2>
                <p className='plot lightFont'>{movieInfo.Plot}</p>
                
                {(movieInfo.Genre).split(', ').map((genre, index) => (
                <span className="badge pill rounded-pill bg-primary">{genre}</span>
                ))}
                <p className='lightFont' style={{float : 'right'}}><img width="40" height="40" src="https://img.icons8.com/color/40/imdb.png" alt="imdb"/> <br></br> {movieInfo.imdbRating}/10 </p>
                <p className='lightFont mt-5'>Release Date : {movieInfo.Released}</p>
                <p className='lightFont mt-3'>Directors : {movieInfo.Director}</p>
                <p className='lightFont mt-3'>Cast : {movieInfo.Actors}</p>
                {movieInfo && movieInfo.Type === 'series' && (
                <span className="badge pill rounded-pill bg-danger mt-2">Number of seasons : {movieInfo.totalSeasons}</span>
    )}
                <p className='mt-3 lightFont avail'>Streaming Availability</p>
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
                        <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/fluency/48/amazon-prime-video.png" alt="amazon-prime-video"/></a>    )}
    {service.service === 'netflix' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/color/48/netflix.png" alt="netflix"/></a>    )}
          {service.service === 'hotstar' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="32" height="32" src="https://img.icons8.com/small/32/disney-hotstar.png" alt="disney-hotstar"/></a>    )}
                {service.service === 'apple' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/fluency/48/apple-tv.png" alt="apple-tv"/></a>    )}
      {service.service === 'zee5' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="50" height="45" src="https://logos-world.net/wp-content/uploads/2021/11/ZEE5-Emblem.png" alt="zee5"/></a>    )}
                      {/* <span>{service.service}</span> */}
                </div>
              );
            }
            return null; // Skip duplicate service icons
          });
        })()
      ) : (
        <p>No streaming data available.</p>
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
