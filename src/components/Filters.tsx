import React, { useState } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { filterByTypeAndStatus } from '../redux/slice'

function Filters() {
    const dataArray = useAppSelector((state) => state.data.filterLabels)
    const dispatch = useAppDispatch();
    const [type, setType] = useState('ALL')
    const [status, setStatus] = useState('ALL')

    const mainFilter = () => {
        dispatch(filterByTypeAndStatus({ type: type, status: status }))
    }

    const statusFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);

    }

    const typeFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    }
    return (
        <Navbar bg="dark" variant="dark">

            <label htmlFor="status">Status filter</label>

            <select value={status} onChange={statusFilterHandler} name="Status filter" id="status">
                <option value={'ALL'}>ALL</option>

                {dataArray.status.map((item: string) => {
                    return (
                        <option key={item} value={item}>{item}</option>

                    )
                })}
            </select>

            <label htmlFor="type">Type filter</label>

            <select value={type} onChange={typeFilterHandler} name="Type filter" id="type">
                <option value={'ALL'}>ALL</option>
                {dataArray.types.map((item: string) => {
                    return (
                        <option key={item} value={item}>{item}</option>

                    )
                })}
            </select>

            <Button onClick={mainFilter} variant="primary">FILTER</Button>

        </Navbar>)
}

export default Filters
