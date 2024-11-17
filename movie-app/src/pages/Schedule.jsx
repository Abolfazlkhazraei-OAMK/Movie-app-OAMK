import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import "./schedule.css";
import Card from "../components/Card";

function Schedule() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch("https://www.finnkino.fi/xml/Schedule/");
        const xmlText = await response.text();

        // Parse the XML data
        const xml = new XMLParser().parseFromString(xmlText);

        // Extract data from <Show> elements
        const allShowtimes = xml.getElementsByTagName("Show").map((show) => ({
          id: show.getElementsByTagName("ID")[0]?.value,
          title: show.getElementsByTagName("Title")[0]?.value,
          startTime: show.getElementsByTagName("dttmShowStart")[0]?.value,
          location: show.getElementsByTagName("Theatre")[0]?.value,
          imageUrl: show.getElementsByTagName("EventMediumImagePortrait")[0]?.value,
        }));

        setMovies(allShowtimes);
        setFilteredMovies(allShowtimes);

        // Extract unique theatres
        const theatreList = Array.from(
          new Set(allShowtimes.map((show) => show.location))
        );
        setTheatres(theatreList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  // Update filteredMovies when selectedTheatre changes
  useEffect(() => {
    if (selectedTheatre) {
      setFilteredMovies(
        movies.filter((movie) => movie.location === selectedTheatre)
      );
    } else {
      setFilteredMovies(movies); // Show all movies if no theatre is selected
    }
  }, [selectedTheatre, movies]);

  return (
    <section id="schedule" className="schedule">
      <div className="container-fluid">
        <div className="row">
          <h4 className="section-title">Showtimes This Week</h4>
        </div>
        <div className="row">
          <div className="filter">
            <select
              id="theatre-select"
              value={selectedTheatre}
              onChange={(e) => setSelectedTheatre(e.target.value)}
            >
              <option value="">All Theatres</option>
              {theatres.map((theatre, index) => (
                <option key={index} value={theatre}>
                  {theatre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-5">
          {loading ? (
            <p>Loading showtimes...</p>
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No showtimes available for the selected theatre.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedule;

/*<div key={movie.id} className="movie-showtime">
                <img src={movie.imageUrl} alt="" />
                <h5></h5>
                <p></p>
                
                </div>
                */