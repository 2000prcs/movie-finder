import React, { Component } from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
    };
  }

  componentDidMount() {
    this.getMovieData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      this.getMovieData();
    }
  }

  getMovieData() {
    setTimeout(() => {
      this.setState({ data: this.props.movies });
    }, 300);
  }

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
              width={5}
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
              width={3}
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
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{vote_average}</Table.Cell>
              <Table.Cell>{release_date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
