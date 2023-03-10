import React, { useState } from "react";
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import "./App.css";
import YearComponents from "./components/YearComponents";
import MonthComponents from "./components/MonthComponents";
import WeekdaysGrid from "./components/WeekdayComponents";
import DayComponents from "./components/DayComponents";
function App() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().toLocaleString("default", { month: "short" }));
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
    const prevYear = () => {
        setYear(year - 1);
    };
    const selMonth=(value: string)=>{
        setMonth(value);
        
    }
    const nextYear = () => {
        setYear(year + 1);
    };
    return (
        <Grid container justifyContent={"center"} alignItems="center" mt={5} mb={5}>
            <Grid item xs={12} sm={10} md={8}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={12} align="center">
                                    <h2>Calendar</h2>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell
                                    sx={{
                                        border: "1px solid rgba(224, 224, 224, 1)",
                                    }}
                                    colSpan={5}
                                >
                                    <YearComponents
                                        onPrevious={prevYear}
                                        year={year}
                                        onNext={nextYear}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{ padding: "0px !important" }}
                                    colSpan={7}
                                >
                                    <MonthComponents onSelMonth={selMonth} month={month} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5} sx={{ padding: "0px !important" }}><DayComponents year={year} month={month} day={selectedDay} modalOpen={modalOpen} onModalOpen={handleModalClose} onDayClick={handleDayClick}/></TableCell>
                                <TableCell colSpan={7} sx={{ padding: "0px !important" }}>
                                    <WeekdaysGrid />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default App;
