import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';
import router from '../../tests/router';

function setup() {
  const wrapper = shallow(<NotFound />, router);

  return {
    wrapper,
  };
}

describe('<NotFound />', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').first().hasClass('NotFound')).toBe(true);
    expect(wrapper.find('h1').first().text()).toEqual('404');
    expect(wrapper.find('img').first().hasClass('hide-sm')).toBe(true);
  });
});
