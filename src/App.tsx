import { useState } from "react";
import axios from "axios";
import "./App.css";

// Define the Movie type to match the structure of the movie object from the API
interface Movie {
  id: string;
  title: string;
  score: number;
  type: string;
  year: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMovieCard, setShowMovieCard] = useState<boolean>(false);
  
  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://mdblist.p.rapidapi.com/",
      params: { s: query },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_MOVIE_API_KEY,
        "x-rapidapi-host": "mdblist.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setShowMovieCard(true);
      setMovies(response?.data?.search || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setQuery("");
    setMovies([]);
    setShowMovieCard(false);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Search your Movie here</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:bg-gray-500 p-2 rounded-md focus-visible:outline-0"
          />
          <button
            onClick={searchMovies}
            disabled={loading}
            className="hover:bg-indigo-600"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          {showMovieCard && (
            <button onClick={clearResult} className="bg-red-500 text-white">
              Clear
            </button>
          )}
        </div>
        {showMovieCard && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-24">
            {movies.map((movie) => (
              <div className="p-4" key={movie.id}>
                <div className="bg-gray-800 bg-opacity-75 relative h-full overflow-hidden rounded-lg px-8 pt-16 pb-16 text-center">
                  <h3 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-500">{movie.type}</h3>
                  <h2 className="title-font text-xl font-medium text-white sm:text-2xl my-4">{movie.title}</h2>
                  <p className="mb-3 leading-relaxed text-gray-500 my-2">{movie.year}</p>
                  <span className="inline-flex items-center py-1 text-sm leading-none text-gray-500">
                    <svg className="mr-1 h-4 w-4 my-2" fill="#99a1af" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.701 471.701" xmlSpace="preserve">
                      <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z">
                      </path>
                    </svg>
                    {movie.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
