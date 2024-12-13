import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser";
import './showtime.css';
//import Card from "./Card";
import Header from "../pages/Header";
import BackToTopBtn from "./BackToTopBtn";
import Footer from "../pages/Footer";

function Showtime() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [scroll, setScroll] = useState(0);

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

  // constantly listens to the scroll position
  useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  return (
    <div className="container-fluid">
        <section>
            <div className="showtime">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                    <div className="timing row">
                        {/* Filter by theatre */}
                        <div className="col-md-3">
                            <select id="theatres"
                            value={selectedTheatre}
                            onChange={(e) => setSelectedTheatre(e.target.value)}>
                                <option value="">Select a theatre</option>
                                {theatres.map((theatre, index) => (
                                    <option key={index}
                                     value={theatre}>
                                        {theatre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="tv-shows row mt-5">
                        <div className="col-md-12">
                            <div className="row">
                                {filteredMovies.map((movie) => (
                                    <div key={movie.id} className="col-md-3">
                                        <div className="card">
                                            <img src={movie.imageUrl} alt={movie.title} className="card-img-top" />
                                            <div className="card-body">
                                                <h5 className="card-title">{movie.title}</h5>
                                                <p>{movie.location}</p>
                                                <p>{movie.startTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
            <Header scroll={scroll} />
            <BackToTopBtn scroll={scroll} />
            <Footer />
        </section>
    </div>
  );
}

export default Showtime;