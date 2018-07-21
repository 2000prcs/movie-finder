import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


export default class Movies extends React.Component {
 constructor(props){
  super(props);
  this.state = {};
 }

  render() {
    return (
      <Table sortable celled fixed>
        <Table.Header>

        </Table.Header>
        <Table.Body>

        </Table.Body>
      </Table>
    );
  }
}
