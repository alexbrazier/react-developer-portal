import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import router from '../../tests/router';

function setup() {
  const props = {
    match: {
      params: {
        id: 'test',
      },
    },
    getAppUsers: jest.fn(),
    app: {
      limit: 1,
      page: 1,
      users: [
        {
          avatar: 'avatar',
          name: 'name',
          id: 'id',
        },
        {
          avatar: 'avatar',
          name: 'name',
          id: 'id',
        },
      ],
    },
  };

  const wrapper = shallow(<App {...props} />, router);

  return {
    props,
    wrapper,
  };
}

describe('<App />', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').first().hasClass('App')).toBe(true);
    expect(wrapper.find('UsersTable')).toHaveLength(1);
  });

  it('should not render UsersTable if users is not set', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('UsersTable')).toHaveLength(1);
    const app = { ...props.app };
    delete app.users;
    wrapper.setProps({ app });
    expect(wrapper.find('UsersTable')).toHaveLength(0);
  });

  it('should call getAppUsers initially', () => {
    const { props } = setup();
    expect(props.getAppUsers).toHaveBeenCalledTimes(1);
    expect(props.getAppUsers).toHaveBeenCalledWith('test', 0);
  });

  describe('changeUsersPage', () => {
    it('should call props.changeUsersPage with appId and page', () => {
      const { wrapper, props } = setup();
      const page = 5;
      expect(props.getAppUsers).toHaveBeenCalledTimes(1);
      wrapper.instance().changeUsersPage(page);
      expect(props.getAppUsers).toHaveBeenCalledTimes(2);
      expect(props.getAppUsers).toHaveBeenCalledWith('test', page);
    });
  });
});
