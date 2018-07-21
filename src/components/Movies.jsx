import React, { Component } from 'react';
import _ from 'lodash';
import {
  Table,
  Button,
  Modal,
  Image,
  Header,
  Rating,
  Popup
} from 'semantic-ui-react';

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
    }, 300);
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
    const { column, data, direction } = this.state;

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
          {_.map(data, ({ id, title, vote_average, release_date }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Modal trigger={<Button basic fluid>{title}</Button>}>
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content image>
                    <Image wrapped size="medium" />
                    <Modal.Description>
                      <Header>Default Profile Image</Header>
                      <p>We've found the following gravatar image associated with your e-mail address.</p>
                      <p>Is it okay to use this photo?</p>
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
