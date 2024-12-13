import axios from "axios";

// Fetch movies from the API
const getMovies = async (req, res) => {
    const { genre, title, year } = req.query;
    try {
        let url;
        // If title is provided, search for movies by title
        if (title) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`;
            if (year) {
                url += `primary_release_year=${year}`; // Add year filter if provided
            }
        } else {
            // If genre is provided, search for movies by genre and/or year
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`;
            if (genre) {
                url += `&with_genres=${genre}`;
            }
            if (year) {
                url += `&primary_release_year=${year}`;
            }
        }
        const response = await axios.get(url);
        res.json(response.data.results);
        } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send({ message: 'Error fetching movies' });
    }
};

// Fetch genres from the API
const getGenres = async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data.genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).send({ message: 'Error fetching genres' });
    }
}

// Fetch movie details and casts from the API
const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`);

        res.status(200).json({
            movie: movieResponse.data,
            cast: castResponse.data.cast.slice(0, 6), // Top 6 cast members
        })
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send({ message: 'Error fetching movie details' });
    }
}

export { getMovies, getGenres, getMovieDetails };