import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TextField, Button, List, ListItem, ListItemText, FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const TodoList = () => {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z'),
  );
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      let val=(value!==null)?value.format("hh:mm a"):'';
      setTasks([...tasks, newTask.trim()+" "+ val]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
            <Button variant="contained" color="secondary" onClick={() => handleDeleteTask(index)}>
              Delete
            </Button>
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