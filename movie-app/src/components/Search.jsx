import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './search.css';

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (search.length === 0) {
        setResults([]);
        return; // Exit early if search is empty
      }
      try {
        setLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=79c7dae27cf47e05e9fe3cbe39e0d621&query=${search}`);
        const data = await response.json();
        // setResults(data.results);
        let filteredResults = data.results;

        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [search]);


  const handleMovieClick = (movieId) => {
    // Handle the click event, e.g., navigate to a movie detail page
    // console.log(`Movie clicked: ${movieId}`);
    navigate(`/movies/${movieId}`);
  };


  return (
    <div className='search-container'>
      <div className="search-box">
          <input 
          type="text" 
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state when input changes 
          />
            <ion-icon name='search-circle-outline'></ion-icon>
        </div>
        {loading && <p className='loading-message'>Loading...</p>} {/* Show loading message when fetching data */}
        <ul>
          {results.map(movie => (
            <li key={movie.id}>
              <button onClick={() => handleMovieClick(movie.id)}>
                {movie.title}
              </button>
            </li> // Display movie titles in a list
          ))}
        </ul>
    </div>
  )
}

export default Search