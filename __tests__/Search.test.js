import React from 'react';
import Search from '../src/components/Search.jsx';


describe('Search component', () => {
  test('Should render Search', () => {
    const SearchWrapper = shallow(<Search />);
    expect(SearchWrapper).toMatchSnapshot();
  });
});
