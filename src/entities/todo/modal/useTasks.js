import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import tasksAPI from '@/shared/api/tasks';
const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case 'ADD': {
      return [...state, action.task];
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id);
    }
    case 'DELETE_ALL': {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure?');

    if (isConfirmed) {
      dispatch({ type: 'DELETE_ALL' });

      tasksAPI.deleteAll(tasks).then(() => setTasks([]));
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      dispatch({ type: 'DELETE', id: taskId });
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone });
    });
  }, []);

  const addTask = useCallback((title) => {
    {
      const newTask = {
        title,
        isDone: false,
      };

      tasksAPI.add(newTask).then((addedTask) => {
        dispatch({ type: 'ADD', task: addedTask });
        setNewTaskTitle('');

        setSearchQuery('');
        newTaskInputRef.current.focus();
      });
    }
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI
      .getAll()
      .then((serverTasks) => dispatch({ type: 'SET_ALL', tasks: serverTasks }));
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,

    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
