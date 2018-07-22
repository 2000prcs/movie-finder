import React from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { keyword, handleInputChange } = this.props;

    return (
      <div className="search">
        <Input onChange={handleInputChange} icon placeholder="Type Movie Title Here!">
          <input />
          <Icon name='search' circular />
        </Input>
        <Label pointing='left'>
          Now Showing: <b>{keyword ? keyword : 'Popular Movies'}</b>
        </Label>
      </div>
    );
  }
}
