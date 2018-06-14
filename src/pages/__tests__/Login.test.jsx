import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';
import router from '../../tests/router';

function setup() {
  const props = {
    user: {},
    login: jest.fn(),
  };

  const wrapper = shallow(<Login {...props} />, router);

  return {
    props,
    wrapper,
  };
}

describe('<Login />', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').first().hasClass('Login')).toBe(true);
    expect(wrapper.find('img').first().hasClass('logo')).toBe(true);
    expect(wrapper.find('LoginBox')).toHaveLength(1);
  });

  it('should render Redirect if accessToken is present', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Redirect')).toHaveLength(0);
    wrapper.setProps({ user: { accessToken: 'token' } });
    expect(wrapper.find('Redirect')).toHaveLength(1);
  });
});
