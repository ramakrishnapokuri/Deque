import React from 'react';
import { shallow } from 'enzyme';
import Book from '../src/components/Book';
describe("Book", () => {
  it("should render Book", () => {
    const wrapper = shallow(<Book />);
  });
});