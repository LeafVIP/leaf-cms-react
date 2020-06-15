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
import Grid from '@material-ui/core/Grid';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';
import Search from '../../util/Search';
import Checkbox from '@material-ui/core/Checkbox';
import MyButton from '../../util/MyButton';
import SimpleSelect from '../../util/SimpleSelect';

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
  { id: 'displayName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'license', numeric: false, disablePadding: false, label: 'License' },
  { id: 'cmId', numeric: false, disablePadding: false, label: 'CMID' },
  { id: 'users', numeric: true, disablePadding: false, label: 'Leaf Users' },
  { id: 'employees', numeric: true, disablePadding: false, label: 'Potential Users' },
  { id: 'saturation', numeric: true, disablePadding: false, label: 'Saturation' },
];

function EnhancedTableHead({classes, order, orderBy, onRequestSort}) {
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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
}));

const EnhancedTableToolbar = ({numSelected, onCreateItem, onSearch, onAdd, offers, allDispensaries, top50}) => {
  const classes = useToolbarStyles();

  const [currentOffer, setCurrentOffer] = React.useState({});

  const changeOffer = (offer) => {
    setCurrentOffer(offer);
  }

  const handleAdd = () => {
    onAdd(currentOffer);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container spacing={3}>
        <Grid item sm={12} xs={3}>
          <Search className={classes.root} onSearchUpdate={onSearch} />
        </Grid>

        <Grid item sm={12} xs={3}>
        {numSelected > 0 ? (
          <>
          <Grid item xs={6}>
               <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                  {numSelected} selected
                </Typography>
          </Grid>
          <Grid item xs={6}>
              {
                offers.length > 0 ? (
                  <div>
                      <Grid item>
                      <SimpleSelect items={offers} onChange={changeOffer}/>
                        <MyButton
                        tip="add to offer"
                        onClick={handleAdd}
                        >
                        
                          <AddCircleOutlinedIcon />
                        </MyButton>
                      </Grid>
                    
                </div>
                ) : (
                  <div></div>
                )
              
              }
           
            </Grid>
          </>
     
      ) : (
        <div>
          <Button>
              <Chip onClick={allDispensaries} label="All Dispensaries"/>
          </Button>

          <Button>
              <Chip onClick={top50} label="Top50"/>
          </Button>
          
        </div>
        
      )}
        </Grid>
      </Grid>
      {numSelected > 0 ? (
        <div></div>
      ) : (
        <Tooltip title='new dispensary'>
          <IconButton aria-label="new dispensary" onClick={onCreateItem}>
          <AddCircleOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
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

const DispensariesTable = ({
  dispensaries, 
  offers,
  onSelectItem, 
  onCreateItem, 
  onAddClicked,
  onCheckItem,
  onAll,
  onTop50
}) => {

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchItems, setSearchItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (searchItems.length === 0) {
      setSearchItems(dispensaries);
    }
  },[searchItems.length, dispensaries])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleCheck = (event, dispensary) => {
    const selectedIndex = selected.indexOf(dispensary);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, dispensary);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log('newSelected = ' +newSelected);
    onCheckItem(newSelected);

  }
  const handleSelectItem = (dispensary) => {
    onSelectItem(dispensary);
  }

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

  const handleSearchQuery = (query) => {
    if(query === '') {
      setSearchItems(dispensaries);
    } else {
      const searchTerm = query.toLowerCase();
      const newItems = searchItems.filter(item => {
        const name = item.displayName.toLowerCase();
        if (name.includes(searchTerm)) {
          return item;
        }
        return null;
      });
      setSearchItems(newItems);
    }
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dispensaries.length - page * rowsPerPage);

  function saturationRate(users, employees) {
    if (users === 0 || employees === 0) {
      return 0;
    }

    return (users / employees).toFixed(2) * 100;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          onCreateItem={onCreateItem} 
          onSearch={handleSearchQuery} 
          onAdd={onAddClicked} 
          offers={offers}
          allDispensaries={onAll}
          top50={onTop50}/>
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
              rowCount={dispensaries.length}
            />
            <TableBody>
              {stableSort(searchItems, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dispensary, index) => {
                  const isItemSelected = isSelected(dispensary);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={dispensary.id}
                      selected={isItemSelected}
                    >
                       <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleCheck(event, dispensary)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    
                        <TableCell 
                          component="th" 
                          id={labelId} 
                          scope="displayName" 
                          align='left' 
                          padding='default'
                          onClick={(event) => handleSelectItem(dispensary)}>
                              <span> {dispensary.displayName}</span>
                        </TableCell>
                        <TableCell align='left' padding='default' scope='license'>{dispensary.license}</TableCell>
                        <TableCell align='left' padding='default' scope='cmId'>{dispensary.cmId}</TableCell>
                        <TableCell align='right' padding='default' scope='users'>{dispensary.users.length}</TableCell>
                        <TableCell align='right' padding='default' scope='employees'>{dispensary.employees}</TableCell>
                        <TableCell align='right' padding='default' scope='role'>{saturationRate(dispensary.users.length, dispensary.employees)}</TableCell>
                     
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
          rowsPerPageOptions={[5, 10, 25, {value: -1, label: 'All'}]}
          component="div"
          count={dispensaries.length}
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

DispensariesTable.propTypes = {
  offers: PropTypes.array.isRequired
}

export default DispensariesTable;