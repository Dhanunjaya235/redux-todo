import './App.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { RootState } from './store';
import { addTodo, deleteTodo, editTodo } from './actions/todo_actions';
import { useRef, useState } from 'react';
import { successToast } from './toasters/message_toasters';
import Icon from '@mdi/react';
import { mdiDeleteAlert } from '@mdi/js';
import { mdiPencilBox } from '@mdi/js';

function App() {


  const todos = useSelector((state: RootState) => state.todos);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const addingTodo = (e: any) => {
    e.preventDefault();
    if (!isEditing) {
      let todo = {
        id: todos.length + 1,
        task: e.target.task.value,
        date: e.target.date.value,
        note: e.target.note.value,
        status: e.target.status.value
      }
      console.log(todo);
      dispatch(addTodo(todo));
      successToast("Todo Added Succeefully");
    }
    else {
      let todo = {
        id: editId,
        task: e.target.task.value,
        date: e.target.date.value,
        note: e.target.note.value,
        status: e.target.status.value
      }
      console.log(todo)
      dispatch(editTodo(todo))
      setIsEditing(false);
      successToast("Todo Edited Successfully")
    }
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const deletingTodo = (id: number) => {
    dispatch(deleteTodo(id));
    successToast("Todo Deleted SuccessFully")
  }
  const editTheTodo = (id: number) => {
    let todo = todos[id - 1];
    console.log(todo);
    if (formRef.current) {
      formRef.current.task.value = todo.task;
      formRef.current.date.value = todo.date;
      formRef.current.note.value = todo.note;
      formRef.current.status.value = todo.status
    }
    setIsEditing(true);
    setEditId(id);
  }
  return (
    <div className="App">
      <div className='form'>
        <h1 style={{marginLeft:"50px"}}>Todo Form</h1>
        <form onSubmit={addingTodo} ref={formRef}>
          <input type="text" placeholder='Enter task' name="task" required /><br></br>
          <input type="date" min={new Date().toISOString().slice(0, 10)} placeholder='Enter Date' name="date" required /><br></br>
          <textarea name="note" placeholder='Enter Your Note' required></textarea><br></br>
          <select name="status" required>
            <option value=''>Select The Status of your Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select><br></br>
          {!isEditing ? <button type='submit'>Add</button> : <button type='submit'>Save</button>}
          <button type='reset'>Reset</button>
        </form>
      </div>
      <div className='todos'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Date</th>
              <th>Note</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(todo =>
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.task}</td>
                  <td>{todo.date}</td>
                  <td>{todo.note}</td>
                  <td>{todo.status}</td>
                  <td><button onClick={() => editTheTodo(todo.id)}><Icon path={mdiPencilBox} size={1}
                    horizontal
                    vertical
                    rotate={90}
                    color="blue"
                    spin /></button></td>
                  <td><button onClick={() => deletingTodo(todo.id)}><Icon path={mdiDeleteAlert} size={1}
                    className="icons"
                    horizontal
                    vertical
                    rotate={90}
                    color="red"
                    spin /></button></td>
                </tr>
                //<p key={todo.id}>{todo.id} {todo.task}  <button onClick={()=>deletingTodo(todo.id)}>Delete</button></p>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
