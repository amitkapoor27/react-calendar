import React, { useState } from "react";
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



const DayComponents = () => {
    const daysInMonth = 31;
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const handleDayClick = (day: number|null) => {
        setSelectedDay(day);
        setModalOpen(true);
      };
    
      const handleModalClose = () => {
        setSelectedDay(null);
        setModalOpen(false);
        setEventDate('');
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
                                            border: "1px solid rgba(224, 224, 224, 1)",
                                        }}
                                    >
                                        <Typography onClick={() => handleDayClick(day)} sx={{textDecoration:(cellsArray[index]===dt)?"underline double  blue;":"",cursor:"pointer"}} variant="subtitle1">
                                            
                                            {cellsArray[index] !== null
                                                ? cellsArray[index]
                                                : ""}
                                        </Typography>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                sx={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}
            >
                <Paper sx={{minWidth:'300px'}}>
                    <Button color="error" sx={{boxShadow:"none"}} onClick={handleModalClose} >X</Button>
                    <TodoList/>
                </Paper>
            </Modal>
        </TableContainer>
    );
};

export default DayComponents;
