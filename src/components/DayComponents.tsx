import React,{useState} from "react";

import {
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import TodoList from "./TodoList";
import CircleIcon from '@mui/icons-material/Circle';
interface GetColor {
    [key: number]: string;
  }
interface DayComponentsProps {
    year:number;
    month:string;
    day:number|null;
    modalOpen:boolean;
    onModalOpen:()=>void;
    onDayClick:(value: number|null) => void;
   
  }
const getColor:GetColor={31:"purple",30:"green",29:"goldenrod",28:"aqua"};


const DayComponents = (props:DayComponentsProps) => {
    const daysInMonth = 31;
    //const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isSetDate,selIsSetDate] =  useState<number | null>(null);
    
    const handleSetDate = () => {
        selIsSetDate(props.day);
    };
    
    
    // Create an array with 31 elements representing the days of the month
    const daysArray = Array.from({ length: daysInMonth }, (v, i) => i + 1);

    // Create an array of 35 elements representing the table cells (7 rows x 5 columns)
    const cellsArray = Array.from({ length: 35 }, (v, i) => {
        const day = daysArray[i];
        return day ? day : null; // set empty cells for days beyond 31
    });
    const dt = new Date().getDate();
    return (

        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {[0, 1, 2, 3, 4, 5, 6].map((rowIndex) => (
                        <TableRow key={rowIndex}>
                            {[0, 1, 2, 3, 4].map((colIndex) => {
                                const index = colIndex * 7 + rowIndex;
                                const day = cellsArray[index];
                                return (
                                    <TableCell
                                        key={index}
                                        align="center"
                                        sx={{
                                            border: "1px solid rgba(224, 224, 224, 1)",backgroundColor:(day===dt)?"antiquewhite":""
                                        }}
                                        
                                    >
                                        <Typography onClick={() => props.onDayClick(day)}  sx={{cursor:"pointer"}} color={(day!==null)?getColor[day]:""} variant="subtitle1">
                                            
                                            {cellsArray[index] !== null
                                                ? cellsArray[index]
                                                : ""} {(day===isSetDate && day !==null)?<CircleIcon color="error" sx={{fontSize:"0.25rem"}}/>:""}
                                            
                                        </Typography>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={props.modalOpen}
                onClose={props.onModalOpen}
                sx={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
            >
                <Paper sx={{minWidth:'400px'}}>
                    
                    <Button color="error" sx={{boxShadow:"none"}} onClick={props.onModalOpen} >X</Button>
                    <Typography align="center">{props.day}-{props.month}-{props.year}</Typography>
                    <TodoList day={props.day} month={props.month} year={props.year} onhandleSetTask={handleSetDate}/>
                </Paper>
            </Modal>
        </TableContainer>
    );
};

export default DayComponents;
