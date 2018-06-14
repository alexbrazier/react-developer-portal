import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import './UsersTable.css';

const UsersTable = props => (
  <div className="UsersTable">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={props.loading ? 'loading' : ''}>
        {props.users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar
                alt={UsersTable.getInitials(user.name)}
                src={user.avatar}
                className="avatar"
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {user.name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          ))}
      </TableBody>
    </Table>

    <TablePagination
      component="div"
      count={UsersTable.getEstimatedTotal(props.limit, props.page, props.users.length)}
      rowsPerPage={props.limit}
      labelDisplayedRows={({ from, to }) => `${from}-${to}`}
      page={props.page}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={(e, page) => props.onChangePage(page)}
      rowsPerPageOptions={[]}
    />
  </div>
);

/**
 * Get the estimated total rows to decide if we need to show the next page button
 * @param {number} limit Results limit
 * @param {number} page Current page, base 0
 * @param {number} resultsSize Count of current results
 */
UsersTable.getEstimatedTotal = (limit, page, resultsSize) => {
  const prevResults = limit * page;
  const additionalResults = resultsSize === limit;
  // As the API doesn't tell us how many results there are in total, we have to assume there
  // is another page if we get the max number of results returned
  return prevResults + resultsSize + (additionalResults ? 1 : 0);
};

/**
 * Simple method to attempt to get 2 initials from a name
 * @param {string} name Person name
 */
UsersTable.getInitials = (name) => {
  const parts = name.split(' ');
  return `${parts[0] && parts[0][0]}${parts[1] && parts[1][0]}`;
};

UsersTable.propTypes = {
  loading: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onChangePage: PropTypes.func.isRequired,
};

UsersTable.defaultProps = {
  loading: false,
};

export default UsersTable;
