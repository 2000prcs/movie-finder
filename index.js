const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

// Note: Uncomment if Redis is installed on the local machine
// const redis = require('redis');

// For API Key security, set API_KEY as process.env variable
require('dotenv').config();

const { API_KEY } = process.env;

const app = express();
const port = process.env.PORT || 7070;

// Middlewares for logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Serve client files
app.use(express.static(path.join(__dirname, './public')));

// Note: Uncomment codes below to connet to Redis Client
// const REDIS_URL = process.env.REDIS_URL || '';
// const redisClient = redis.createClient(REDIS_URL);

// GET request for movie search
app.get('/search/:searchKeyword/:page', (req, res) => {
  const { searchKeyword, page } = req.params;
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchKeyword}&page=${page}`;
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const url = (searchKeyword === 'popular') ? popularMoviesUrl : searchMoviesUrl;

  // Comment out if using Redis
  axios.get(url)
    .then(response => res.end(JSON.stringify(response.data)))
    .catch(err => console.log(err));


  // Note: Uncomment codes below for using Redis
  // In order to use Redis, Redis server should be globally installed on the local machine

  // redisClient.get(`${searchKeyword}-${page}`, (error, result) => {
  //   if (result) {
  //   // the result exists in cache - return it to our user immediately
  //     console.log('Redis cached the data');
  //     res.send(JSON.parse(result));
  //   } else {
  //   // if there's no cached movie data, get it from TMDB API
  //     axios.get(url)
  //       .then((response) => {
  //         // store the key-value pair (keyword-page: data) in cache with an expiry of 1 minute (60s)
  //         redisClient.setex(`${searchKeyword}-${page}`, 60, JSON.stringify(response.data));
  //         res.end(JSON.stringify(response.data));
  //       })
  //       .catch(err => console.log(err));
  //   }
  // });
});

// GET request for movie trailer
app.get('/search/:movieId', (req, res) => {
  const { movieId } = req.params;
  const searchVideoUrl = `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

  axios.get(searchVideoUrl)
    .then(response => res.end(JSON.stringify(response.data)))
    .catch(err => console.log(err));
});

app.listen(port, console.log(`Server is listening to the port ${port}....`));
