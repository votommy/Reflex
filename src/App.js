import {useEffect, useState} from 'react';
import './App.css';
import Logo from './logo.svg';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_KEY = "da716740";
const API_URL = "https://www.omdbapi.com?apikey=" + API_KEY;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleKeyDown = (e) => {
        console.log("key down");
        if(e.keyCode === 13) {
            e.preventDefault();
            document.getElementById("searchBtn").click();
        }
    }

    useEffect (() => {
        searchMovies('');
    }, []);

    return (
        <div className="app">
            <img src={Logo} alt="OMDb logo" width="200px;" />
            <h1>Open Movie Database</h1>
            <div className="search">
                <input placeholder="Search for movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                <img id="searchBtn" src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => 
                            <MovieCard movie={movie} />
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

            <footer>Developed by: Tommy Vo | <a href="https://github.com/votommy/Reflex" target="_blank" rel="noopener noreferrer" aria-label="OMDb Github repository - opens in new tab">Source Code</a></footer>
        </div>
    );
}

export default App;