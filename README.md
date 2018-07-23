# Movie Search App
> Web application allowing users to search for their favorite movies with a fast, clear interface. 

## Table of Contents

1. [Usage](#usage)
2. [Testing](#testing)

## Demo

👉 Play Demo <a href="https://mo-movie-finder.herokuapp.com/">here</a>.

## Requirements

### Allow a user to search for movies by title.

As user types a search keyword in the search bar, a method `handleInputChange()` takes the input value and invokes `fetchMovieData()` method to render the search result.
`fetchMovieData()` method is sending GET request to the express server to receive movies data by searching with the keyword. It requests IMDB API movies data based on a movie title matching with the keyword. 

### Display visual results as the user types.

As user types a keyword in the search bar, `handleInputChange()` gets invoked with the new input. And it re-renders the movie data.

### Add navigation for large result sets (e.g., pagination, infinite scroll).

I used Semantic UI React's Pagination component, and `handlePaginationChange()` gets invoked whenever user clicks a different page number. `handlePaginationChange()` method is invoking `fetchMovieData()` method with a new page number, and `fetchMovieData()` method is sending GET request to receive a new movie data based on the current page number.

### How to set up the application and dependencies

Please check [Usage](#usage) below for installations!

### Challenges, and how you overcame them

1. Display Detailed Movie Information

My initial plan was making each table row collapsable to show more movie information such as its description, its poster image, and its trailer. But, I switched my plan to use a modal to emphasize the selected movie and achieve a better user exprience. The modal display looks cleaner and more straightforward.   

2. Data Loading Speed

Since I moved API calls to the server side, the data loading speed got much slower (300ms ~ 400ms).
I used Redis as a caching layer to boost the loading speed up to 10 times. (10ms ~ 30ms) 

### Reasoning behind any design decisions

1. Main UI

I used Semantic UI React to build components quickly and improve UI design. I mainly focused to build simple & clean UI. 

2. Movies data

I used a table to render data more organized & structured, and star icons to show the rating visually nicer. 

3. Modal

I used a modal to show each movie's additional information. I also added its poster image, and a label allowing users to check the movie's trailer if it exists. It improves the user exprience by giving them options to see more details. 
4. Keyword label

I added a label to show current search keyword as user types. This is also for a better user exprience by allowing the user to see what's currently searched.

### Future improvements you would make with more time

1. UI Design

I used Semantic UI React to build the app quickly and more simplified, but I'd like to build my own uniq UI if I have more time.

2. Additional Features

Currently the app's simply showing popular movies and movies based on the search keyword. But I'd like to add more options to show 'Recenlty Released Movies', 'Upcoming Movies', and 'Top Rated Movies'. I can also add an option to allow users to review the movie, and search movies based on the director, or the country. 

## Prerequisites

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Usage

From within the root directory:

1. Install project dependencies:

```sh
npm install
```

2. Build a client bundle with Webpack: 

```sh
npm run build 
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
* [IMDB V3 API](https://developers.themoviedb.org/3/getting-started/introduction)
* [Semantic UI React](https://react.semantic-ui.com/introduction)
* [Lodash](https://lodash.com/)
* [Axios](https://github.com/axios/axios)
* [Redis](https://redis.io/)

## Style Guide

Refer to the [AirBnb Style Guide](https://github.com/airbnb/javascript).
