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
interface MonthComponentsProps {
    month:string;
    onSelMonth:(value: string) => void;
   
  }
function MonthComponents(props:MonthComponentsProps) {
    const date = new Date();
    const monthName = date.toLocaleString("default", { month: "short" });
    
    return (
        <Table>
            <TableBody>
                {months.map((items, index) => (
                    <TableRow>
                        {items.map((item, ind) => (
                            
                            <TableCell align="center" sx={{border:"1px solid rgba(224, 224, 224, 1)"}}>
                                <Typography sx={{textDecoration:(item===monthName.toUpperCase())?"underline double  blue;":""}} color={(item===props.month.toUpperCase())?"red":"black"} onClick={()=>props.onSelMonth(item)} variant="subtitle1">
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
