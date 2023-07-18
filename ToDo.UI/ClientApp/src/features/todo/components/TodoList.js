import {useGetToDosQuery} from 'app/services/api';
import TodoListItem from "./TodoListItem";
import {Row, Table} from "reactstrap";
import React from "react";

const TodoList = () => {
    const {data, isLoading} = useGetToDosQuery();

    if (isLoading) {
        return <Row>Loading</Row>
    }

    if (!data?.length) {
        return <Row>No data</Row>
    }

    return (
        <Row>
            <Table striped>
                <thead>
                <tr>
                    <th/>
                    <th>Id</th>
                    <th>Note</th>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {data.map(todo => (
                    <TodoListItem key={todo.id} item={todo}/>
                ))}
                </tbody>
            </Table>
        </Row>
    );
};

export default TodoList;
