
// ASSIGNMENT 4: 
// ------------
// Movie Streaming Platform

// You are working on a movie recommendation system.

// Test data:
// const movies = [
//   { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
//   { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
//   { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
//   { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
// ];


// Tasks:
//     1. filter() only "Sci-Fi" movies
//     2. map() to return:
//             "Inception (8.8)"

//     3. reduce() to find average movie rating
//     4. find() movie "Joker"
//     5. findIndex() of "Avengers"

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

// 1. Sci-Fi movies
let sci = movies.filter(m => m.genre === "Sci-Fi");
console.log(sci);

// 2. format title (rating)
let formatted = movies.map(m => `${m.title} (${m.rating})`);
console.log(formatted);

// 3. average rating
let totalRating = movies.reduce((acc, m) => acc + m.rating, 0);
console.log(totalRating / movies.length);

// 4. find Joker
let f5 = movies.find(m => m.title === "Joker");
console.log(f5);

// 5. findIndex Avengers
let f6 = movies.findIndex(m => m.title === "Avengers");
console.log(f6);
