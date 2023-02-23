import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TextField, Button, List, ListItem, ListItemText, FormControl, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
interface TodoListProps {
  year:number;
  month:string;
  day:number|null;
  onhandleSetTask:() => void;
  
}

const TodoList = (props:TodoListProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [delete_task, setdelete_task] = useState('');
  useEffect(() => {
    fetchData();
  }, [newTask, delete_task]);
  const fetchData = async () => {
    try {
      const monthIndex = new Date(Date.parse(props.month + ` ${props.day}, ${props.year}`)).getMonth(); 
      var month = "";
      var day = "";
      if(monthIndex <= 9){
        month = `0${monthIndex+1}`
      }else{
        month = `${monthIndex+1}`
      }
  
      const props_data = {"date":`${props.year}-${month}-${props.day}`};
      // console.log(props_data); 
      const response = await fetch('http://172.16.3.48/New-SSO-b4/get_task.php',{
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props_data),
      });
      const json = await response.json();
        console.log(json);
        //setJson_data(json);
        
        const new_arr = json.data.map((element:any, index:any) => {
           return `${element.id} ${element.task} ${element.date_of_time}`;
         })
        //  console.log(new_arr);
        setTasks(new_arr);
    } catch (error) {
      console.log(error);
    }
  };
 

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      let val=(value!==null)?value.format("hh:mm a"):'';
      const monthIndex = new Date(Date.parse(props.month + ` ${props.day}, ${props.year}`)).getMonth(); 
        var month = "";
        var day = "";
        if(monthIndex <= 9){
          month = `0${monthIndex+1}`
        }else{
          month = `${monthIndex+1}`
        }
    
      let date = props.day+"-"+props.month+"-"+props.year;
      setTasks([...tasks, newTask.trim()+" | "+date+" "+ val]);
      props.onhandleSetTask();
      let datetime= props.year+"-"+month+"-"+props.day+" "+((value!==null)?value.format("HH:MM:00"):'00:00:00');
    
     handleSubmit({task: newTask.trim(),dateoftime: datetime});
      
    }
  };

  const handleDeleteTask = async(index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    
    try {
      const obj={id:index};
      const response = await fetch('http://172.16.3.48/New-SSO-b4/delete_task.php', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      const json = await response.json();
      console.log(json)
      setdelete_task(json)
      
      // if (response.ok) {
      //   // handle successful response
        
      // } else {
      //   // handle error response
      // }
    } catch (error) {
      // handle network error
    }
    setTasks(newTasks);
  };
  const handleSubmit = async (obj:object) => {

  
    try {
      const response = await fetch('http://172.16.3.48/New-SSO-b4/create_task.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      
      const json = await response.json();
      fetchData();
      //console.log(json)
      // if (response.ok) {
      //   // handle successful response
        
        
      // } else {
      //   // handle error response
      // }
    } catch (error) {
      // handle network error
    }
  };
  return (
    <div>
      <List>
        {tasks.map((task, index) => {
          // console.log(tasks)
          var list_name = tasks[index].split(' ')
          var id = +list_name[0];
          return(
          <ListItem key={index}>
            <ListItemText primary={`${list_name[1]} ${list_name[2]} ${list_name[3]}`} />
            <IconButton aria-label="delete"  color="secondary" onClick={() => handleDeleteTask(id)}>
              <DeleteIcon  />
            </IconButton>

          </ListItem>
        )
        })}
      </List>
      <FormControl  sx={{display: 'flex',alignItems: 'center','& .MuiTextField-root': { m: 1, width: '25ch',paddingBottom:'2px' }}}>
        <TextField
          label="New Task"
          value={newTask}
          onChange={handleNewTaskChange}
          variant="outlined"
          size="medium"
          inputProps={{ maxLength: 20 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        <Button variant="contained" sx={{marginBottom:'5px'}}  color="primary" onClick={handleAddTask}>
          Add
        </Button>
        
      </FormControl>
      
    </div>
  );
};

export default TodoList;
