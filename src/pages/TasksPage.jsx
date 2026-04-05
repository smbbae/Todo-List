import { TaskProvider } from '../context/TasksContext';
import Todo from '../components/Todo/Todo';

const TasksPage = () => {
  return (
    <TaskProvider>
      <Todo />
    </TaskProvider>
  );
};
export default TasksPage;
