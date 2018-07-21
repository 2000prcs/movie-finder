import React, { Component } from 'react';
import {
  Container,
  Header,
  Icon,
  Pagination,
} from 'semantic-ui-react';
import Search from './Search.jsx';
import Movies from './Movies.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 10,
      activePage: 1,
      keyword: 'cat',
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  componentDidMount() {
    this.fetchMovieData();
  }

  fetchMovieData() {
    const key = '403ffcb3b4481da342203f94fb6e937e';
    const keyword = this.state.keyword;
    const page = this.state.activePage;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${keyword}&page=${page}`)
      .then(res => res.json())
      .then((data) => {
        console.log('Movie data received :', data);
        this.setState({ movies: data.results });
        this.setState({ totalPages: data.total_pages });
      })
      .catch(error => console.log('Failed', error));
  }


  handleInputChange() {

  }

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
                Let's Search Movies!
            </Header.Content>
          </Header>
        </div>
        <Search handleInputChange={this.handleInputChange} />
        <Movies movies={movies} />
        <div>
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
