import React, {useState} from 'react';
import {useDeleteToDoMutation, useUpdateToDoMutation} from "app/services/api";
import {Button, ButtonGroup, Input} from "reactstrap";

const TodoListItem = ({item}) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);

    const [updateToDo] = useUpdateToDoMutation();
    const [deleteToDo] = useDeleteToDoMutation();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleRemove = () => {
        deleteToDo(item.id);
    };

    const handleSave = async () => {
        await updateToDo({...item, title}).unwrap();
        setEditing(false);
    }

    const handleCancel = () => {
        setTitle(item.title);
        setEditing(false);
    }


    if (editing) {
        return (
            <tr>
                <td>
                    <ButtonGroup size="sm">
                        <Button onClick={handleSave} color="primary">Save</Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </td>
                <td>{item.id}</td>
                <td><Input placeholder="What needs to be done?" value={title} onChange={handleChange}/></td>
                <td>{item.user}</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>
                <ButtonGroup size="sm">
                    <Button onClick={handleRemove} color="danger">
                        Delete
                    </Button>
                    <Button onClick={() => setEditing(true)}>
                        Edit
                    </Button>
                </ButtonGroup>
            </td>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.user}</td>
        </tr>
    );
};

export default TodoListItem;
