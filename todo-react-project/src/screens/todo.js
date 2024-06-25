import React, {useState} from 'react'

const TodoItem = ({listItem, isChecked, handleCheckbox, removeItem, saveEditedItem}) => {
    const [editingItem, setEditingItem] = useState(false)
    const [textValue, setTextValue] = useState('');

    const handleEdit = () => {
        setEditingItem(true);
    }

    const saveEdited = () => {
        setEditingItem(false);
        saveEditedItem(textValue);
    }

    return <tr>
        <td><input type="checkbox" checked={isChecked} onChange={handleCheckbox}/></td>
        <td>{editingItem ? <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)}/> :
            <p>{listItem}</p>}</td>
        <td>
            <button onClick={removeItem}>Remove</button>
        </td>
        <td>
            {editingItem ? <button onClick={saveEdited}>Save</button> : <button onClick={handleEdit}>Edit</button>}
        </td>
    </tr>
}

export const TodoScreen = () => {
    const [todoList, setTodoList] = useState([]);
    const [currentTextInput, setCurrentTextInput] = useState([]);

    const addTodoItem = (e) => {
        setTodoList([...todoList, {value: currentTextInput, checked: false}]);
    }

    const removeDone = () => {
        const newTodoList = todoList.filter((listItem) => {
            return !listItem.checked;
        });

        setTodoList(newTodoList);
    }

    const removeItem = (index) => {
        return () => {
            const newTodoList = [...todoList];
            newTodoList.splice(index, 1);

            setTodoList(newTodoList);
        }
    }

    const handleCheckbox = (id) => {
        return (e) => {
            const newTodoList = [...todoList];
            newTodoList[id].checked = !newTodoList[id].checked;
            setTodoList([...newTodoList]);
        }
    }

    const saveEditedItem = (index) => {
        return (itemValue) => {
            const newTodoList = [...todoList];
            const newItem = newTodoList[index];
            newItem.value = itemValue;

            newTodoList[index] = newItem;
            setTodoList(newTodoList);
        }
    }

    return <div className="App-header">
        <h3>This is a todo list</h3>
        <div className="addItem">
            <div>
                <input type="text" placeholder={'add todo item'} onChange={(e) => setCurrentTextInput(e.target.value)}/>
                <button onClick={addTodoItem}>Add</button>
            </div>
            <div>
                <button style={{width: '100%',}} onClick={removeDone}>Remove completed</button>
            </div>
        </div>
        <table>
            <thead>
            <tr>
                <th>Checkbox</th>
                <th>Name</th>
                <th>Remove</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {todoList.map((listItem, index) => <TodoItem listItem={listItem.value}
                                                         handleCheckbox={handleCheckbox(index)}
                                                         removeItem={removeItem(index)}
                                                         saveEditedItem={saveEditedItem(index)}
                                                         isChecked={listItem.checked}></TodoItem>)}
            </tbody>
        </table>
    </div>
}
