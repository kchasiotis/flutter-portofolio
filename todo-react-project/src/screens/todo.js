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

    return <div className="todoItem" style={{display: 'flex', width:'100%', justifyContent: 'space-between'}}>
        <div><input type="checkbox" checked={isChecked} onChange={handleCheckbox}/></div>
        <div>{editingItem ? <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)}/> :
            <p>{listItem}</p>}</div>
        <div>
            <button onClick={removeItem}>Remove</button>
        </div>
        <div>
            {editingItem ? <button onClick={saveEdited}>Save</button> : <button onClick={handleEdit}>Edit</button>}
        </div>
    </div>
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
        <div className="todoTable">
            <div style={{display: 'flex', textAlign: 'center'}}>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <h5>Checkbox</h5>
                </div>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <h5>Name</h5>
                </div>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <h5>Remove</h5>
                </div>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <h5>Edit</h5>
                </div>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {todoList.map((listItem, index) => <TodoItem listItem={listItem.value}
                                                             handleCheckbox={handleCheckbox(index)}
                                                             removeItem={removeItem(index)}
                                                             saveEditedItem={saveEditedItem(index)}
                                                             isChecked={listItem.checked}></TodoItem>)}
            </div>
        </div>
    </div>
}
