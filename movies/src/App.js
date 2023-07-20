import React, { useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

import { useState } from "react";
import AddMovie from "./components/AddMovie";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// we can use other syntax using async and await instead using the then
	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true); //Before we load the data we set it to true
		setError(null); // Clear any previous erros.

		try {
			const response = await fetch("https://react-http-f3edc-default-rtdb.firebaseio.com/movies.json");
      // considered the database from google free firebase.
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedMovies = [];
			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			setMovies(loadedMovies);
			// after loading the data we can set it to false again.
		} catch (Error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	// function fetchMoviesHandler() {
	// 	fetch("https://swapi.dev/api/films/")
	// 		.then((response) => {
	// 			return response.json(); // translates the data
	// 		})

	// 		.then((data) => {}

	async function addMovieHandler(movie) {
		const response = fetch("https://react-http-f3edc-default-rtdb.firebaseio.com/movies.json", {
			method: "POST",
			body: JSON.stringify(movie),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = (await response).json();
		console.log(data);
	}
	let content = <p>Loading..</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}
	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
