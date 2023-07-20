import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

import { useState } from "react";


function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);


// we can use other syntax using async and await instead using the then
  async function fetchMoviesHandler() {
    setIsLoading(true); //Before we load the data we set it to true
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,      // here we will put the desired name for the incoming dataresults.
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);     // after loading the data we can set it to false again.
  }

	// function fetchMoviesHandler() {
	// 	fetch("https://swapi.dev/api/films/")
	// 		.then((response) => {
	// 			return response.json(); // translates the data
	// 		})

	// 		.then((data) => {}


return (
  <React.Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
      {isLoading && <p>Loading...</p>}
    </section>
  </React.Fragment>
);

}



export default App;
