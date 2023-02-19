import React from 'react';
import { Table, TableBody, TableCell, TableContainer,  TableRow, Paper, Typography } from '@mui/material';

function WeekdaysTable() {
// /  const classes = useStyles();
  const weekdays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {weekdays.map(day => (
            <TableRow key={day}>
              {[...Array(7)].map((_, i) => (
                <TableCell key={i} align="center" sx={{border:"1px solid rgba(224, 224, 224, 1)"}}>
                  <Typography variant="subtitle1">{weekdays[(weekdays.indexOf(day) + i) % 7]}</Typography>
                </TableCell>
              ))}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeekdaysTable;
