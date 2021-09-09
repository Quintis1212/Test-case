import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setPageNumber } from '../redux/slice'

function PaginationWrapper() {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector((state) => state.data.currentPage)

    const changePage = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }
    const dataArray = useAppSelector((state) => state.data.value);
    const pages = Math.ceil(dataArray.length / 12)
    const paginationItems = []
    for (let index = 1; index <= pages; index++) {
        paginationItems.push(
            <Pagination.Item onClick={() => { changePage(index) }} key={index} active={index === currentPage}>
                {index}
            </Pagination.Item>,
        )

    }
    return (
        <Pagination>
            {paginationItems}
        </Pagination>

    )
}

export default PaginationWrapper
