import React, { useState } from 'react'
import { Button, ButtonGroup, FormControl, Modal } from 'react-bootstrap';
import { useAppDispatch } from '../redux/hooks';
import { changeTransaction, deleteItem } from '../redux/slice';

type tableRowItemProps = {
    item: string
}


function TableRowItem(props: tableRowItemProps) {
    const dispatch = useAppDispatch()

    const ID = props.item.split(",")[0]
    const [showEditModal, setShowEditModal] = useState(false);
    const [textInput, setTextInput] = useState('')
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const saveTransactionChanges = () => {
        dispatch(changeTransaction({ id: ID, text: textInput }))
        setShowEditModal(false)
    }

    const deleteTransaction = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this transaction?')) {
            dispatch(deleteItem(ID))

        }
    }
    return (
        <>
            <tr>
                {props.item.split(",").map((item: string) => {
                    return (<td key={item}>{item}</td>
                    )
                })}
                <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={handleShowEditModal} >EDIT</Button>
                        <Button onClick={deleteTransaction}>DELETE</Button>
                    </ButtonGroup>
                </td>
            </tr>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>You can change transaction status</Modal.Body>

                <Modal.Footer>
                    <FormControl
                        placeholder="Transaction status"
                        aria-label="Transaction status"
                        aria-describedby="basic-addon1"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />

                    <Button onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button onClick={saveTransactionChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TableRowItem
