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
function App() {
    const [year, setYear] = useState(new Date().getFullYear());
    const prevYear = () => {
        setYear(year - 1);
    };

    const nextYear = () => {
        setYear(year + 1);
    };
    return (
        <Grid container justifyContent={"center"} alignItems="center" mt={5}>
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
                                <TableCell rowSpan={3}  colSpan={5}>
                                    <YearComponents onPrevious={prevYear} year={year} onNext={nextYear} />
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow key={2}>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow key={3}>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default App;

