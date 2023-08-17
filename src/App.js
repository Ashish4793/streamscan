import React from "react";
import { useState , useEffect  } from "react";
import './App.css';
import SearchIcon from './search.svg'
import { Routes, Route } from 'react-router-dom';
import Logo from './logo.png'
import MovieCard from "./MovieCard";
import MovieDetails from './MovieDetails';


const API_URL = 'http://www.omdbapi.com/?apikey=5cbd0352'


function App() {

  const [movies , setMovies] = useState([]);
  const [searchTerm , setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Batman');
  } , []);

  
  return (

    <Routes>
<Route exact path="/" element={
  <div className="app">
    <div>
    <h1 className="display-5"><img width={60} height={60} src={Logo} alt="logo"/>
StreamScan</h1>
<p className="tagline mt-3">"Find. Stream. Enjoy. StreamScan Does It All."
</p>
      </div>  
  <div className="search">
    <input
     placeholder="Search for movies"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     />
     <img 
     src={SearchIcon}
     alt="search"
     onClick={() => searchMovies(searchTerm)}
     />
  </div>
  
  {
    movies?.length > 0 
    ? (
       <div className="container">
        {movies.map((movie) => (
        <MovieCard movie={movie} />
        ))}
       </div>
    ) : (
        <div className="empty">
         <h2>No movies found!</h2>
        </div>
    )
  }

  

</div>
} />
      
      <Route path="/movie/:id/" element={<MovieDetails />} />
    </Routes>
      
    
  );
}

export default App;
