import React from 'react'
import { useAppSelector } from '../redux/hooks'
import TableRowItem from './TableRowItem'


type tableRowProps = {
    tableRowArray: Array<any>;
}


function TableRowList(props: tableRowProps) {
    const currentPage = useAppSelector((state) => state.data.currentPage)
    return (
        <>
            {(props.tableRowArray.slice(currentPage * 12 - 12, currentPage * 12) || []).map(((el: string, i: number) => {
                if (i === 0 && el.split(",")[0] === 'TransactionId') {
                    return (
                        <thead key={el}>
                            <tr>
                                {el.split(",").map((el: string) => {
                                    return <th key={el}>{el}</th>
                                })}
                            </tr>
                        </thead>
                    )
                }
                return (
                    <tbody key={el}>
                        <TableRowItem item={el} />
                    </tbody>
                )
            }))}
        </>
    )
}

export default TableRowList
