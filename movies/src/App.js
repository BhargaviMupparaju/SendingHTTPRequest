import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

import { useState } from "react";
function App() {
	const [movies, setMovies] = useState([]);
	function fetchMoviesHandler() {
		fetch("https://swapi.dev/api/films/")
			.then((response) => {
				return response.json(); // translates the data
			})
			.then((data) => {
				const transformedMovies = data.results.map((movieData) => {
					return {
						id: movieData.episode_id,
						title: movieData.title, // here we will put the desired name for the incoming dataresults.
						openingText: movieData.opening_crawl,
						releaseDate: movieData.release_date,
					};
				});
				setMovies(transformedMovies);
			});
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={movies} />
			</section>
		</React.Fragment>
	);
}

export default App;
