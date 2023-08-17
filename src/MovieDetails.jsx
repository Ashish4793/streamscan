import React, { useCallback } from 'react';
import Logo from './logo.png'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';


const MovieDetails = () => {
  const { id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const imageUrl = searchParams.get('imageUrl');

  console.log(imageUrl);

  const [movie , setMovie] = useState([null]);

  const getStreamAvailability = useCallback( async () => {
    const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${id}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '13ed3f0fbemsh44f0ea7afbe4615p16ceb7jsnfce2100a7d8e',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};


try {
  console.log("yes");
	const response = await fetch(url, options);
	const result = await response.json();
  console.log(result);
  setMovie(result.result);
} catch (error) {
	console.error(error);
}
  } , [id]);

  useEffect(() => {
    getStreamAvailability();
  } ,[getStreamAvailability]);

  if (movie.title === undefined) {
    return <div>
<div className='text-center mt-5'>
    <h1 className="display-5 mt-5"><img width={60} height={60} src={Logo} alt="logo"/>
StreamScan</h1>
<p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."
</p>
      </div>
      <h1  className='text-center mt-5'>Please wait fetching data ...</h1>
    </div>;
  }

  return (
    <div className="movie-details">
      <div className='text-center'>
    <a className='noUnderline' href="/">
    <h1 style={{margin:20}} className="display-5"><img width={60} height={60} src={Logo} alt="logo"/>
StreamScan</h1>
    </a>
<p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."
</p>
      </div>
      <div className="container">
        <div className="card bg-secondary mb-5 h-100" style={{width: '100%'}}>
          <div className="row g-0">
            <div className="col-sm-4 position-relative">
              <a href='/'><img style={{width:400 , height : 400}} src={imageUrl} className="card-img fit-cover h-100 w-100" alt="..." />
              </a>
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <div>
                <h2 className="card-title text-center  movieTitle display-5">
                  {movie.title} <br />
                  <p className='smol'>({movie.type})</p>
                </h2>
                <p className='mt-3 avail'>Streaming Availability</p>
                <div>
                  
                    {(movie.streamingInfo.in).map((service) => (
                     
                     <div className='flex'>
                      {service.service === 'prime' && (
                        <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/fluency/48/amazon-prime-video.png" alt="amazon-prime-video"/></a>    )}
    {service.service === 'netflix' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/color/48/netflix.png" alt="netflix"/></a>    )}
          {service.service === 'hotstar' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="32" height="32" src="https://img.icons8.com/small/32/disney-hotstar.png" alt="disney-hotstar"/></a>    )}
                {service.service === 'apple' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="48" height="48" src="https://img.icons8.com/fluency/48/apple-tv.png" alt="apple-tv"/></a>    )}
      {service.service === 'zee5' && (
      <a target='_blank' rel='noreferrer' href={service.link}><img className='rightMargin' width="75" height="55" src="https://logos-world.net/wp-content/uploads/2021/11/ZEE5-Logo.png" alt="zee5"/></a>    )}
                      {/* <span>{service.service}</span> */}
                     </div>

                    ))}
                  

                </div>
                </div>
                
                <p className="card-text mt-5">Release Year :&nbsp; {movie.year}</p>
                <p className="card-text flex">Directed by : &nbsp; {
                  (movie.directors).map((director) => (
                    <p>{director}&nbsp;</p>
                    
                  ))
                }</p>
                <br></br>
                <p className="card-text flex">Genres : &nbsp; {
                  (movie.genres).map((genre) => (
                    <p>{genre.name},&nbsp;</p>
                  ))
                }</p>
                <br />
                <span className="badge rounded-pill bg-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
