# Movie Search App
> Web application allowing users to search for their favorite movies with a fast, clear interface. 

## Table of Contents

1. [Usage](#usage)
2. [Testing](#testing)

## Demo

👉 Play Demo <a href="https://mo-movie-finder.herokuapp.com/">here</a>.

<br>

<img width="400" height="300" src="https://i.imgur.com/W3hByI4.png">

## Achievements

1. Clean and simple UI
2. Display search results in real time
3. Secured API key information by [dotenv](https://github.com/motdotla/dotenv#readme)
4. Increased data loading speed for frequently searched keywords
5. Achieved 85% testing coverage
6. Deployed the app on Heroku

## Requirements

### Allow a user to search for movies by title.

As a user types in the search bar, a method `handleInputChange()` takes the input value and invokes `fetchMovieData()` to render the search result.
`fetchMovieData()` sends a GET request to the express server to receive a movies data by searching with the keyword. The backend makes a request to the TMDB API to find movie titles containing the keyword. 

### Display visual results as the user types.

As user types a keyword in the search bar, `handleInputChange()` gets invoked with the new input. And it re-renders the movie data.

### Add navigation for large result sets (e.g., pagination, infinite scroll).

I used Semantic UI React's Pagination component, and `handlePaginationChange()` gets invoked whenever a user clicks a different page number. `handlePaginationChange()` is invoking `fetchMovieData()` with a new page number, and `fetchMovieData()` is sending a GET request to receive movie data based on the current page number.

### Challenges, and how you overcame them

1. Display Detailed Movie Information

My initial plan was making each table row collapsable to show more movie information such as its description, its poster image, and its trailer. But, I switched my plan to use a modal to emphasize the selected movie and achieve a better user exprience. The modal display looks cleaner and more straightforward.   

2. Data Loading Speed

I moved API calls to the server side for API key security, the data loading speed got much slower (300ms ~ 400ms).
I used Redis as a caching layer to boost the loading speed of frequently searched keywords up to 100 times (3ms ~ 170ms). 

### Reasoning behind design decisions

1. Main UI

I used Semantic UI React to build components quickly and with a uniform UI design. I mainly focused on building a simple & clean UI. 

2. Movies data

I used a table to render data in a more organized & structured manner, also I used star icons to show the rating in a more visually accessible way. 

3. Modal

I used a modal to show each movie's additional information. I also added its poster image, and a label allowing users to check the movie's trailer if it exists. It improves the user exprience by giving them options to see more details in a centeralized way. 

4. Keyword label

I added a label to show the current search keyword as user types. This is also leads to a better user exprience by allowing the user to see what's currently searched if it gets overwritten by new search keywords.

### Future improvements you would make with more time

1. UI Design

I used Semantic UI React to build the app quickly and more simplified, but I'd like to build my own unique UI if I had more time.

2. Additional Features

Currently the app is simply showing popular movies and movies based on the search keyword. I'd like to add more options to show 'Recenlty Released Movies', 'Upcoming Movies', and 'Top Rated Movies'. I would also like to add an option allowing users to review the movie and search movies based on the director or the country. 

## Prerequisites

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Usage

From the root directory:

1. Install project dependencies:

```sh
npm install
```

2. Build a client bundle with Webpack: 

```sh
npm run postinstall
```

3. Start Express server:

```sh
npm start 
```

4. Open browser at `127.0.0.1:7070` 

5. Enjoy!

## Testing

```sh
npm test
```

## Built With

* [React](https://reactjs.org/) 
* [NPM](https://www.npmjs.com/)
* [TMDB V3 API](https://developers.themoviedb.org/3/getting-started/introduction)
* [Semantic UI React](https://react.semantic-ui.com/introduction)
* [Axios](https://github.com/axios/axios)
* [Lodash](https://lodash.com/)
* [Redis](https://redis.io/)
* [dotenv](https://github.com/motdotla/dotenv#readme)
* [Jest](https://jestjs.io/)
* [Enzyme](https://airbnb.io/enzyme/)
* [Heroku](https://www.heroku.com/)

## Style Guide

Refer to the [AirBnb Style Guide](https://github.com/airbnb/javascript).
