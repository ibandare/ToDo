import React, {useState} from 'react';
import {useAddToDoMutation} from 'app/services/api';
import {connect} from "react-redux";
import {addToast} from "features/toasts/toastsSlice";
import {Button, Col, Input, InputGroup, Row} from "reactstrap";

const TodoHeader = ({addToast}) => {
    const [title, setTitle] = useState('');
    const [addToDo] = useAddToDoMutation();

    const handleAdd = async () => {
        try {
            await addToDo({title, userId: 1}).unwrap();
            setTitle('');
        } catch {
            addToast({
                message: "We couldn't save your data, try again",
                type: 'error',
                duration: 0,
                isClosable: true,
            });
        }
    }

    const handleChange = (e) => {
        setTitle(e.target.value);
    };


    return (
        <>
            <Row>
                <Col tag="h3">Add New </Col>
            </Row>
            <Row>
                <Col tag={InputGroup}>
                    <Input placeholder="What needs to be done?" value={title} onChange={handleChange}/>
                    <Button color="success" onClick={handleAdd}>
                        Create
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default connect(null, {addToast})(TodoHeader);
