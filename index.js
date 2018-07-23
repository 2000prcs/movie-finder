const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
// const cors = require('cors');
const path = require('path');
const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7070;

// Middlewares for logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));
// app.use(cors());

// Accessing IMDB API_KEY from process.env
const { API_KEY } = process.env;

app.get('/search/:searchKeyword/:page', (req, res) => {
  const { searchKeyword, page } = req.params;
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKeyword}&page=${page}`;
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const url = (searchKeyword === 'popular') ? popularMoviesUrl : searchMoviesUrl;

  axios.get(url)
    .then(response => res.end(JSON.stringify(response.data)))
    .catch(err => console.log(err));
});

app.get('/search/:movieId', (req, res) => {
  const { movieId } = req.params;
  const searchVideoUrl = `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

  axios.get(searchVideoUrl)
    .then(response => res.end(JSON.stringify(response.data)))
    .catch(err => console.log(err));
});

app.listen(port, console.log(`Server is listening to the port ${port}....`));
