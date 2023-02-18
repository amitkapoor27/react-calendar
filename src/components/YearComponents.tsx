import React from "react";
import { Grid } from "@mui/material";
import { ArrowLeft,ArrowRight } from "@mui/icons-material";

interface YearComponentsProps {
    year: number;
    onPrevious:()=>void;
    onNext:()=>void;
  }
function YearComponents(props:YearComponentsProps) {
    //const [year, setYear] = useState(new Date().getFullYear());
    /*const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());
  const [day, setDay] = useState(new Date().toLocaleString("en-us", { weekday: "long" }));*/


    return (
        <Grid container spacing={2} justifyContent={"center"} alignItems="center">
            <ArrowLeft fontSize={"large"} onClick={props.onPrevious} sx={{cursor:"pointer"}} ></ArrowLeft>
            <h2>{props.year}</h2>
            <ArrowRight fontSize={"large"} onClick={props.onNext} sx={{cursor:"pointer"}}></ArrowRight>
        </Grid>
    );
};

export default YearComponents;
