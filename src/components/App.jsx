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
      moives: [],
    };
  }

  componentDidMount(){
    this.fetchMovieData();
  }

  fetchMovieData() {
    let key = '403ffcb3b4481da342203f94fb6e937e';
    let keyword = 'cat';
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${keyword}`)
      .then(res => res.json())
      .then(result => console.log('Movie data received :', result))
      .catch(error => console.log('Failed', error));
  }

  render() {

    const { movies } = this.state;

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
        <Search />
        <Movies movies={movies}/>
        <div>
          <Pagination
            defaultActivePage={5}
            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
            firstItem={{ content: <Icon name="angle double left" />, icon: true }}
            lastItem={{ content: <Icon name="angle double right" />, icon: true }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={10}
          />
        </div>
      </Container>
    );
  }
}
