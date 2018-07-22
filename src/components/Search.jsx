import React from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';


const Search = ({ keyword, handleInputChange }) => (
  <div className="search">
    <Input onChange={handleInputChange} icon placeholder="Type Movie Title Here!">
      <input />
      <Icon name="search" circular />
    </Input>
    <Label pointing="left">
      Now Showing: <b>{keyword ? keyword : 'IMDB Popular Movies'}</b>
    </Label>
  </div>
);

export default Search;
