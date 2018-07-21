import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="search">
        <Input onChange={this.props.handleInputChange} action={{ icon: 'search' }} placeholder="Search..." />
      </div>
    );
  }
}
