import { render, screen } from '@testing-library/react';
import App from './App';
import { getRecommendedMovies } from "./getRecommendedMovies";
import data from "./movies.json";

test('renders Movies Recommendation App Title', () => {
  render(<App />);
  const appTitle = screen.getByText(/Movies Recommendation App/i);
  expect(appTitle).toBeInTheDocument();
});

test('should return an array of recommended movies based on user preferences', () => {
  const movieIds = [1, 15, 55]
  const recommendedMovies = getRecommendedMovies(data, movieIds, 5)

  expect(recommendedMovies).toEqual([
    'Star Wars (1977)',
    'Return of the Jedi (1983)',
    'Fargo (1996)',
    'Independence Day (ID4) (1996)',
    'Raiders of the Lost Ark (1981)'
  ]);
});

test('should not return any movies that were entered', () => {
  const movieIds = [2,44];
  const recommendedMovies = getRecommendedMovies(data, movieIds, 10);

  expect(recommendedMovies).not.toEqual([
    'GoldenEye (1995)',
    'Striptease (1996)'
  ]);
})

test('should return correct count of movies', () => {
  const movieIds = [9,14,57];
  const count = 15;
  const recommendedMovies = getRecommendedMovies(data, movieIds, 15);

  expect(recommendedMovies.length).toEqual(count);
})

test('should return an empty array when no movies match user preferences', () => {
  const movieIds = [71, 72, 73];
  const recommendedMovies = getRecommendedMovies(data, movieIds, 10);

  expect(recommendedMovies).toEqual([]);
})
