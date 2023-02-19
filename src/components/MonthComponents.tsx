import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
const months = [
    ["APR", "JAN", "MAY", "AUG", "FEB", "JUN", "SEP"],
    ["JUL", "OCT", " ", " ", "MAR", " ", "DEC"],
    [" ", " ", " ", " ", "NOV", " ", " "],
];
function MonthComponents() {
    return (
        <Table>
            <TableBody>
                {months.map((items, index) => (
                    <TableRow>
                        {items.map((item, ind) => (
                            <TableCell align="center" sx={{border:"1px solid rgba(224, 224, 224, 1)"}}>
                                <Typography variant="h5" component="h5">
                                    {item}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default MonthComponents;
