import Field from './Field';

const SearchTaskForm = (props) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        className="todo__field"
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
