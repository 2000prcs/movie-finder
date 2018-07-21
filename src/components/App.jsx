import React, { Component } from 'react';
import {
  Container,
  Header,
  Icon,
  Pagination,
} from 'semantic-ui-react';
import Search from './Search.jsx';
import Movies from './Movies.jsx';

const { API_KEY } = require('../../config/IMDBconfig');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 10,
      activePage: 1,
      keyword: 'cat',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  // componentDidMount() {
  //   this.fetchMovieData();
  // }

  // Fetch movie data from IMDB API
  fetchMovieData(page = this.state.activePage, keyword = this.state.keyword) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`)
      .then(res => res.json())
      .then((data) => {
        console.log('Movie data received :', data);
        this.setState({ movies: data.results });
        this.setState({ totalPages: data.total_pages });
      })
      .catch(error => console.log('Failed', error));
  }


  // Change search keyword by user input
  // Change current page to page 1
  handleInputChange(e) {
    if (e.target.value) {
      this.setState({ keyword: e.target.value }, () => {
        this.setState({ activePage: 1 });
        this.fetchMovieData(1);
      });
    }
  }

  // Change active page by pagination
  handlePaginationChange(e, { activePage }) {
    this.setState({ activePage }, () => {
      this.fetchMovieData();
    });
  }

  render() {
    const { movies, totalPages, activePage } = this.state;

    return (
      <Container>
        <div className="header">
          <Header as="h1" icon textAlign="center">
            <Icon name="video" circular />
            <Header.Content>
                Mo's Movie Finder
            </Header.Content>
          </Header>
        </div>
        <Search handleInputChange={this.handleInputChange} />
        <Movies movies={movies} />
        <div className="pagination">
          <Pagination
            activePage={activePage}
            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
            firstItem={{ content: <Icon name="angle double left" />, icon: true }}
            lastItem={{ content: <Icon name="angle double right" />, icon: true }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            onPageChange={this.handlePaginationChange}
            totalPages={totalPages}
          />
        </div>
      </Container>
    );
  }
}
