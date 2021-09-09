import React, { ReactElement } from 'react'
import { Table } from 'react-bootstrap';


type tableWrapperProps = {
    tableHead: Array<string>;
    children: ReactElement<any, any>;
}

function TableWrapper(props: tableWrapperProps) {
    return (
        <Table striped bordered hover>
            {props.children}
        </Table>
    )
}

export default TableWrapper
