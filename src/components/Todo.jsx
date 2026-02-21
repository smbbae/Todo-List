import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './Todolist';

const Todo = () => {
  const tasks = [
    { id: 'task-1', title: 'buy milk', isDone: false },
    { id: 'task-2', title: 'pet the cat', isDone: true },
  ];

  const deleteAllTasks = () => {
    console.log('delete all');
  };

  const deleteTask = (taskId) => {
    console.log(`delete task with id: ${taskId}`);
  };

  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`task ${taskId} is ${isDone ? 'done' : 'not done'}`);
  };

  const filterTasks = (query) => {
    console.log(`Search: ${query}`);
  };

  const addTask = () => {
    console.log(`the task is added`);
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
