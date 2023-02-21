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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.16.3.48/New-SSO-b4/get_task.php');
        const json = await response.json();
          setTasks(JSON.parse(json));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [tasks]);
  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      let val=(value!==null)?value.format("hh:mm a"):'';
      let date = props.day+"-"+props.month+"-"+props.year;
      setTasks([...tasks, newTask.trim()+" | "+date+" "+ val]);
      props.onhandleSetTask();
      let datetime= props.year+"-"+props.month+"-"+props.day+" "+((value!==null)?value.format("HH:MM:SS"):'00:00:00');
    
     handleSubmit({task: newTask.trim(),dateoftime: datetime});
      setNewTask('');
    }
  };

  const handleDeleteTask = async(index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    
    try {
      const obj={id:index};
      const response = await fetch('http://172.16.3.48/New-SSO-b4/create_task.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
      
      if (response.ok) {
        // handle successful response
        
      } else {
        // handle error response
      }
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
      
      if (response.ok) {
        // handle successful response
        
      } else {
        // handle error response
      }
    } catch (error) {
      // handle network error
    }
  };
  return (
    <div>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
            <IconButton aria-label="delete"  color="secondary" onClick={() => handleDeleteTask(index)}>
              <DeleteIcon  />
            </IconButton>

          </ListItem>
        ))}
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
