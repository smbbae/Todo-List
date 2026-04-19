// import { TaskProvider } from '../../entities/todo/modal/TasksContext';
import { TaskProvider } from '@/entities/todo/modal/TasksContext';

import Todo from '@/widgets/Todo/Todo';

const TasksPage = () => {
  return (
    <TaskProvider>
      <Todo />
    </TaskProvider>
  );
};
export default TasksPage;
