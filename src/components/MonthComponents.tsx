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
const getColor=(year:number,month:string)=>{
    
    const monthIndex = new Date(Date.parse(month +" 1, "+year)).getMonth();
    const daysInMonth = new Date(year, monthIndex+1, 0).getDate();
    const clor=(daysInMonth===31)?"purple":((daysInMonth===30)?"green":"goldenrod");
    return clor;
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
                               
                                <Typography sx={{textDecoration:(item===monthName.toUpperCase())?"underline double  blue;":((item===props.month)?"underline dashed red 2px":"")}} color={getColor(2023,item)} onClick={()=>props.onSelMonth(item)} variant="subtitle1">
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
