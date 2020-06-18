import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Search from '../../util/Search';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'dispensary', numeric: false, disablePadding: false, label: 'Dispensary' },
  { id: 'zip', numeric: true, disablePadding: false, label: 'Zipcode' },
  { id: 'badgeState', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'platform', numeric: true, disablePadding: false, label: 'Platform' },
  { id: 'version', numeric: true, disablePadding: false, label: 'Version' },
  { id: 'locationEnabled', numeric: false, disablePadding: false, label: 'Location Enabled' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Member Since' },
];

function EnhancedTableHead({classes, order, orderBy, onRequestSort}) {
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  chip: {
    background: '#ddd',
    color: '#000000'

  },
  chip_on: {
    background: '#128710',
    color: '#FFF'
  }
}));

const EnhancedTableToolbar = ({users, numSelected, onAddClick, onSearch, onFilter, onClearFilter}) => {
  const classes = useToolbarStyles();

  const [activeFilter, setActiveFilter] = useState('all');

  const numberOfUsers = () => {
    return (users !== undefined) ? users.length :  0;
  }

  const numberOfBadgeState = (badgeState) => {
    return (users !== undefined) ? users.filter(user => user.badgeState === badgeState).length : 0;
  }

  const numberOfPlatformUsers = (platform) => {
    return (users !== undefined) ? users.filter(user => user.platform === platform).length : 0;
  }

  const numberOfRoleUsers = (role) => {
    return (users !== undefined) ? users.filter(user => user.role === role).length : 0;
  }


  const handleClear = () => {
    onClearFilter();
    setActiveFilter('all');
  }

  const handleInReview = () => {
    const newUsers = users.filter(user => user.badgeState === 'inReview');
    setActiveFilter('inReview');
    onFilter(newUsers);
  }

  const handleApproved = () => {
    const newUsers = users.filter(user => user.badgeState === 'approved');
    setActiveFilter('approved');
    onFilter(newUsers);
  }

  const handleIos = () => {
    const newUsers = users.filter(user => user.platform === 'ios');
    setActiveFilter('ios');
    onFilter(newUsers);
  }

  const handleAndroid = () => {
    const newUsers = users.filter(user => user.platform === 'android');
    setActiveFilter('android');
    onFilter(newUsers);
  }

  const handleBudtender = () => {
    const newUsers = users.filter(user => user.role === 'budtender');
    setActiveFilter('budtender');
    onFilter(newUsers);
  }

  const handleBrand = () => {
    const newUsers = users.filter(user => user.role === 'brand');
    setActiveFilter('brand');
    onFilter(newUsers);
  }

  const handleManager = () => {
    const newUsers = users.filter(user => user.role === 'manager');
    setActiveFilter('manager');
    onFilter(newUsers);
  }

  const handleBuyer = () => {
    const newUsers = users.filter(user => user.role === 'buyer');
    setActiveFilter('buyer');
    onFilter(newUsers);
  }

  const handleFrontdesk = () => {
    const newUsers = users.filter(user => user.role === 'front desk');
    setActiveFilter('frontdesk');
    onFilter(newUsers);
  }

  const handleSecurity = () => {
    const newUsers = users.filter(user => user.role === 'security');
    setActiveFilter('security');
    onFilter(newUsers);

  }


  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container spacing={12}>
        <Grid item sm={12}>
        <Search onSearchUpdate={onSearch} />
    
    {numSelected > 0 ? (
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>
    ) : (
      <div></div>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="New User">
        <IconButton aria-label="new user" onClick={onAddClick}>
          <AddCircleOutlinedIcon />
        </IconButton>
      </Tooltip>
    )
}
        </Grid>

        <Grid item sm={12}>
        <Chip 
          id="all"
          label={`total (${numberOfUsers()})`} 
          onClick={handleClear}
          className={activeFilter === 'all' ?  classes.chip_on : classes.chip}
          clickable/>
        <Chip 
          id="badgeState"
          value="inReview"
          label={`in review (${numberOfBadgeState('inReview')})`} 
          onClick={handleInReview}
          className={activeFilter === 'inReview' ?  classes.chip_on : classes.chip}
          clickable/>
        <Chip 
          id="badgeState"
          value="approved"
          label={`approved (${numberOfBadgeState('approved')})`} 
          onClick={handleApproved}
          className={activeFilter === 'approved' ?  classes.chip_on : classes.chip}
          clickable />
        <Chip 
          id="platform"
          value="ios"
          label={`ios (${numberOfPlatformUsers('ios')})`} 
          onClick={handleIos}
          className={activeFilter === 'ios' ?  classes.chip_on : classes.chip}
          clickable/>
        <Chip 
          id="platform"
          value="android"
          label={`android (${numberOfPlatformUsers('android')})`}
          onClick={handleAndroid}
          className={activeFilter === 'android' ?  classes.chip_on : classes.chip}
          clickable/>
        <Chip 
          id="budtenders"
          value="budtenders"
          label={`budtenders (${numberOfRoleUsers('budtender')})`}
          onClick={handleBudtender}
          className={activeFilter === 'budtender' ?  classes.chip_on : classes.chip}
          clickable/>

        <Chip 
          id="managers"
          value="managers"
          label={`managers (${numberOfRoleUsers('manager')})`}
          onClick={handleManager}
          className={activeFilter === 'manager' ?  classes.chip_on : classes.chip}
          clickable/>

        <Chip 
          id="buyer"
          value="buyer"
          label={`buyer (${numberOfRoleUsers('buyer')})`}
          onClick={handleBuyer}
          className={activeFilter === 'buyer' ?  classes.chip_on : classes.chip}
          clickable/>

        <Chip 
          id="frontdesk"
          value="frontdesk"
          label={`frontdesk (${numberOfRoleUsers('front desk')})`}
          onClick={handleFrontdesk}
          className={activeFilter === 'frontdesk' ?  classes.chip_on : classes.chip}
          clickable/>

        <Chip 
          id="security"
          value="security"
          label={`security (${numberOfRoleUsers('security')})`}
          onClick={handleSecurity}
          className={activeFilter === 'security' ?  classes.chip_on : classes.chip}
          clickable/>

        <Chip 
          id="brand"
          value="brand"
          label={`brand (${numberOfRoleUsers('brand')})`}
          onClick={handleBrand  }
          className={activeFilter === 'brand' ?  classes.chip_on : classes.chip}
          clickable/>
        </Grid>
      </Grid>

      )


    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const UsersTable = ({users, onSelectUser, onSelectBadge, onCreateItem}) => {

    const timestamp = (createdAt) => {
      if(createdAt !== undefined) {
        return new Date(createdAt._seconds * 1000).toLocaleDateString("en-US")
      }
     
    }

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    if (searchItems.length === 0) {
      setSearchItems(users);
    }
  },[searchItems.length, users])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, user) => {
    console.log('handleClick: event name: ' +event.name + ' - value: ' + event.value);
     onSelectUser(user);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleFilterUsers = (filteredUsers) => {

    setSearchItems(filteredUsers);
  }

  const handleClearFilter = () => {
    setSearchItems(users);
  }

  const name = (firstName, lastName) => {
      if(firstName !== undefined) {
        return <span>{firstName} {lastName}</span>
      }
      return "n/a";
  }
  const handleSearchQuery = (query) => {
    if(query === '') {
      setSearchItems(users);
    } else {
      const searchTerm = query.toLowerCase();
      const newItems = searchItems.filter(item => {
        const containsEmail = item.email !== null;
        const containsFirstName = item.firstName !== null;
        const containsLastName = item.lastName !== null;
        const containsAuthUid = item.authUid !== null;

        if (containsEmail) {
          return item.email.toLowerCase().includes(searchTerm);
        }

        if (containsFirstName) {
          return item.firstName.toLowerCase().includes(searchTerm);
        }

        if (containsLastName) {
          return item.lastName.toLowerCase().includes(searchTerm);
        }

        if (containsAuthUid) {
          return item.authUid.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return null;
      
      });

      console.log('newItems = ' +newItems.length);
   
      setSearchItems(newItems);


      
    }
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          users={users} 
          numSelected={selected.length} 
          onAddClick={onCreateItem} 
          onSearch={handleSearchQuery}
          onFilter={handleFilterUsers}
          onClearFilter={handleClearFilter} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(searchItems, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, user)}
                      tabIndex={-1}
                      key={user.email}
                    >
                   
                      <TableCell  scope="name"  align='left' padding='default'>
                        <span>{user.firstName !== '' ? name(user.firstName, user.lastName) : 'n/a'}</span>
                      </TableCell>
                      <TableCell align='left' padding='default' name='role' scope='role'>{user.role !== ''  && user.role !== undefined ? user.role :  'unknown'}</TableCell>
                      <TableCell align='left' padding='default' name='dispensary' scope='dispensary'>{user.dispensary !== '' && user.dispensary !== undefined ? user.dispensary : 'unknown'}</TableCell>
                      <TableCell align='left' padding='default' name='zip' scope='zip'>{user.zip !== '' && user.zip !== undefined ? user.zip : 'unknown'}</TableCell>
                      <TableCell align='left' padding='default' name='badgeState' scope='badgeState' onClick={onSelectBadge}>{user.badgeState !== null && user.badgeState !== undefined ? user.badgeState : 'unknown'}</TableCell>
                      <TableCell align='left' padding='default' name='platform' scope='platform'>{user.platform !== '' && user.platform !== undefined ? user.platform : 'unknown'}</TableCell>
                      <TableCell align='left' padding='default' name='version' scope='version'>{user.version !== '' && user.version !== undefined ? user.version : 0.0}</TableCell>
                      <TableCell align='left' padding='default' name='locationEnabled' scope='locationEnabled'>{user.locationEnabled !== undefined  && user.locationEnabled === true ? 'true' : 'false'}</TableCell>
                      <TableCell align='left' padding='default' name='createdAt' scope='createdAt'>{timestamp(user.createdAt)}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 250, {value: -1, label: 'All'}]}
          component="div"
          count={searchItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default UsersTable;