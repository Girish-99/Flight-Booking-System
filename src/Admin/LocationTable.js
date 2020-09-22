import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      width: '100%',
    //   alignItems : 'center',
    //   justifyContent : 'center'
    },
    container: {
      maxHeight: 440,
    },
  });

const LocationTable=()=>{

    const classes = useStyles();
    const [location, setLocation]= useState([])
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    

    useEffect(()=>{
        getLocation();
    },[])

    const getLocation= ()=>{
        Axios.get('http://localhost:9001/flight/location/all')
            .then((response)=>{
                console.log(response)
                setLocation(response.data)
            })
    }

    return(
        <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>Location Id</TableCell>
                <TableCell> Name</TableCell>
                <TableCell> Code</TableCell>
                <TableCell> Airport Name</TableCell>
                <TableCell> Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {location.map((location) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>{location.id}</TableCell>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.code}</TableCell>
                    <TableCell>{location.airportName}</TableCell>
                    <TableCell>{location.country}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={location.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    )
}


export default LocationTable