import axios from "axios";

// Fetch movies from the API
const getMovies = async (req, res) => {
    const { genre, title, year } = req.query;
    try {
        let url;
        if (genre && title && year) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_ACCESS_TOKEN}&query=${title}&year=${year}&with_genres=${genre}`;
            } else if (genre && title) {
                url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_ACCESS_TOKEN}&query=${title}&with_genres=${genre}`;
            }
            const response = await axios.get(url);
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ message: 'Error fetching movies' });
        }
};

// Fetch genres from the API
const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_ACCESS_TOKEN}`);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_ACCESS_TOKEN}`);

        res.status(200).json({
            movie: movieResponse.data,
            credits: creditsResponse.data.cast.slice(0, 6), // Top 6 cast members
        })
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ message: 'Error fetching movie details' });
    }
}

export { getMovies, getMovieDetails };