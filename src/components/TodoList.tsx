import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';


const TodoList = () => {

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
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
      <form>
        <TextField
          
          label="New Task"
          value={newTask}
          onChange={handleNewTaskChange}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add
        </Button>
      </form>
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
    </div>
  );
};

export default TodoList;
