import Todo from './components/Todo';
import { TaskProvider } from './context/TasksContext';

const App = () => {
  console.log('app');

  return (
    <TaskProvider>
      <Todo />;
    </TaskProvider>
  );
};

export default App;
