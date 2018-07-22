import React from 'react';
import _ from 'lodash';
import {
  Table,
  Button,
  Modal,
  Image,
  Rating,
  Label,
} from 'semantic-ui-react';

const axios = require('axios');

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
    };
  }

  // Render movie data upon mounting
  componentDidMount() {
    this.getMovieData();
  }

  // Update movie data when props changes
  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.getMovieData();
    }
  }

  // Get movie data from App component
  getMovieData() {
    setTimeout(() => {
      this.setState({ data: this.props.movies });
    }, 100);
  }

  // Get movie trailer when user clicks a movie title
  getMovieTrailer(id) {
    axios.get(`/search/${id}`)
      .then((response) => {
        this.setState({ movieTrailerKey: response.data.results[0].key });
      })
      .catch((error) => {
        console.log('Error occured while fetching data: ', error);
        this.setState({ movieTrailerKey: null });
      });
  }

  // Sort the table by each column
  handleSort(clickedColumn) {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }


  render() {
    const { column, data, direction, movieTrailerKey } = this.state;

    return (
      <Table sortable fixed singleLine striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={4}
              sorted={column === 'title' ? direction : null}
              onClick={() => this.handleSort('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              width={3}
              sorted={column === 'vote_average' ? direction : null}
              onClick={() => this.handleSort('vote_average')}
            >
              IMDB Rating
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'release_date' ? direction : null}
              onClick={() => this.handleSort('release_date')}
            >
              Release Date
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ id, title, vote_average, release_date, overview, poster_path }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Modal size="small" trigger={<Button onClick={() => this.getMovieTrailer(id)} basic fluid>{title}</Button>}>
                  <Modal.Header>{title}</Modal.Header>
                  <Modal.Content image>
                    <Image
                      as="a"
                      wrapped
                      size="large"
                      src={`http://image.tmdb.org/t/p/w342${poster_path}`}
                      href={movieTrailerKey ? `https://www.youtube.com/watch?v=${movieTrailerKey}` : '#'}
                      target="_blank"
                    />
                    <Modal.Description>
                      <p>{overview}</p>
                      {movieTrailerKey
                      ? <Label as="a" color="teal" tag href={`https://www.youtube.com/watch?v=${movieTrailerKey}`} target="_blank">
                          Watch Movie Trailer
                        </Label>
                      : <Label as='a' color='red' tag>
                          Sorry, No Movie Trailer
                        </Label>
                      }
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Table.Cell>
              <Table.Cell>
                {vote_average}  
                <Rating icon="star" disabled defaultRating={vote_average} maxRating={10} />
              </Table.Cell>
              <Table.Cell textAlign="center">{release_date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
