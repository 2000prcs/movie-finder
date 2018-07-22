import React from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';


export default class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <Input onChange={this.props.handleInputChange} icon placeholder="Search...">
          <input />
          <Icon name='search' circular />
        </Input>
          <Label pointing='left'>Type Movie Title Here!</Label>
      </div>
    );
  }
}
