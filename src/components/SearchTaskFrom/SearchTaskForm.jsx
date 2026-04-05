import { useContext } from 'react';
import Field from '../Field/Field';
import { TasksContext } from '../../context/TasksContext';

const SearchTaskForm = (props) => {
  const { styles } = props;
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        onInput={(event) => setSearchQuery(event.target.value)}
        value={searchQuery}
      />
    </form>
  );
};

export default SearchTaskForm;
