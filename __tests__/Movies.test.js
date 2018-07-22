import React from 'react';
import sinon from 'sinon';
import "isomorphic-fetch";
import Movies from '../src/components/Movies.jsx';

let sampleMovieData1 = {};

let sampleMovieData2 = {
  id: 777,
  title: 'Secrets of Korean Skin Care',
  vote_average: 10,
  release_date: '2018-07-22',
};


describe('Movies component', () => {
  test('Should render Movies', () => {
    const MoviesWrapper = shallow(<Movies />);
    expect(MoviesWrapper).toMatchSnapshot();
  });

  test('Should render movies data upon mounting', () => {
    sinon.spy(Movies.prototype, 'getMovieData');
    const MoviesWrapper = mount(<Movies />);
    expect(Movies.prototype.getMovieData.calledOnce).toBe(true);
    Movies.prototype.getMovieData.restore();
    MoviesWrapper.unmount();
  });

  test('Should render movies data on prop change', () => {
    sinon.spy(Movies.prototype, 'getMovieData');
    const MoviesWrapper = mount(<Movies movies={sampleMovieData1} />);
    MoviesWrapper.setProps({ movies: sampleMovieData2 });
    expect(Movies.prototype.getMovieData.calledTwice).toBe(true);  // Called once on initial mount, and again on prop change
    Movies.prototype.getMovieData.restore();
    MoviesWrapper.unmount();
  });

  test('Should sort the table by clicking the table head', () => {
    sinon.spy(Movies.prototype, 'handleSort');
    const MoviesWrapper = mount(<Movies />);
    MoviesWrapper.find('th').first().simulate('click');
    expect(Movies.prototype.handleSort.calledOnce).toBe(true);
    Movies.prototype.handleSort.restore();
    MoviesWrapper.unmount();
  });

  test('Should display a modal with the movie description and the movie trailer', () => {
    sinon.spy(Movies.prototype, 'getMovieTrailer');
    const MoviesWrapper = mount(<Movies />);
    MoviesWrapper.setState({ data: sampleMovieData2 });
    MoviesWrapper.update();
    MoviesWrapper.find('button').first().simulate('click');
    expect(Movies.prototype.getMovieTrailer.calledOnce).toBe(true);
    Movies.prototype.getMovieTrailer.restore();
    MoviesWrapper.unmount();
  });
});
