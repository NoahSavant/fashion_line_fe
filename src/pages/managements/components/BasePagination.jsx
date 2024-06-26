import {Pagination} from "rsuite";
import { PaginationDefault } from "@/constants";
import { useEffect, useState } from "react";
const BasePagination = ({ pagination, handlePagination, className='' }) => {
    const { currentPage, totalRow, perPage,  lastPage} = pagination ?? {};

    const handleLimit = (newLimit) => {
        handlePagination({page:1, limit:newLimit});
    }

    const handlePage = (newPage) => {
        handlePagination({page:newPage, limit:perPage});
    }

    return (
        <div className="p-2">
            <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                maxButtons={3}
                size="xs"
                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                total={totalRow}
                limitOptions={PaginationDefault.LIMIT_OPTIONS}
                limit={perPage}
                activePage={currentPage}
                onChangePage={handlePage}
                onChangeLimit={handleLimit}
                className={`${className} pagination`}
            />
        </div>
    );
}

export default BasePagination
