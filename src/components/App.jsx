import React from 'react';
import {
  Container,
  Header,
  Icon,
  Pagination,
} from 'semantic-ui-react';
import _ from 'lodash';
import Search from './Search.jsx';
import Movies from './Movies.jsx';

const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 10,
      activePage: 1,
      keyword: '',
    };

    this.debounced = _.debounce(() => {
      this.fetchMovieData(1);
    }, 100);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  // The initial page loads popular movies based on TMDB Movie Popularity Data
  componentDidMount() {
    this.fetchMovieData();
  }

  // Fetch movie data from TMDB API
  // If there's no search keyword, show TMDB popular movies
  // When there's a new search keyword, set current page to page 1
  fetchMovieData(page = this.state.activePage, keyword = this.state.keyword) {
    const searchKeyword = keyword || 'popular';
    const currentPage = page || 1;

    axios.get(`/search/${searchKeyword}/${page}`)
      .then((response) => {
        this.setState({
          movies: response.data.results,
          totalPages: response.data.total_pages,
          activePage: currentPage,
        });
      })
      .catch(error => console.log('Error occured while fetching movie data', error));
  }


  // Change search keyword by user input
  // Wait 100ms to fetch movie data to avoid too often GET requests
  handleInputChange(e) {
    this.setState({ keyword: e.target.value });
    this.debounced();
  }

  // Change active page by pagination
  handlePaginationChange(e, { activePage }) {
    this.setState({ activePage }, () => {
      this.fetchMovieData(activePage);
    });
  }

  render() {
    const { movies, totalPages, activePage, keyword } = this.state;

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
        <Search handleInputChange={this.handleInputChange} keyword={keyword} />
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
