import React from "react";
import { useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg' ;
import MovieCard from "./MovieCard";

//c8a2be36-api key

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c8a2be36';

//static
/*const movie1 = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}*/
const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies= async (title)=>
    {
        const response = await fetch('http://www.omdbapi.com/?s=Superman&apikey=c8a2be36');
        const data = await response.json();
        
        setMovies(data.Search);
    }

    const filterMovies= async ()=>
    {
        const response = await fetch('http://www.omdbapi.com/?s="'+searchTerm+'"&apikey=c8a2be36');
        const data = await response.json();
        
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('');
    }, []);


    return (
    <div className="App">
    <h1>FilmLand</h1>

    <div className="search">
    <input placeholder="Search for movies" 
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}

    />
    <img 
    src={SearchIcon}
    alt= "search"
    onClick={() => filterMovies()}
    />
    </div>

    {movies?.length > 0
        ?(
            <div className="container">
             {movies.map((movie)=>(<MovieCard movie = {movie} />))}
            </div>

        ) :
        (
            <div className="empty">
            <h2>No movies found</h2>
            </div>
        ) }
        </div>
    );


}
export default App;