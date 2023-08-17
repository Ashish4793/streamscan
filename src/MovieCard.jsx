import React from "react";
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: "underline",
  color: 'white'
};

const MovieCard = ({ movie }) => {
    return (
<div className="movie">
          <div>
            <p>{movie.Year}</p>
          </div>

          <div>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}/>
          </div>

          <div>
            <span>{movie.Type}</span>
            <h3>{movie.Title}</h3>
            <Link style={linkStyle} to={{pathname :  `/movie/${movie.imdbID}/` ,  search: `?imageUrl=${movie.Poster}` }}>Streaming Info</Link>

          </div>
          

        </div>
    )
}


export default MovieCard;