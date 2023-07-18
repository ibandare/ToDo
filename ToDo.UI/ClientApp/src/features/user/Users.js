import React, {useState} from "react";
import {useGetUsersQuery} from "../../app/services/api";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {Row} from "reactstrap";
import toDotNotation from "utils/toDotNotation";

const columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true
}, {
    dataField: 'userName',
    text: 'Name',
    filter: textFilter(),
    sort: true
}, {
    dataField: 'email',
    text: 'Email',
    filter: textFilter(),
    sort: true
}];

const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];

export const Users = () => {
    const [params, setParams] = useState({
        "sortOrder": "asc",
        "sortField": "id",
        "filters": {},
        "page": 1,
        "sizePerPage": 10
    });
    const {data, isLoading} = useGetUsersQuery(toDotNotation(params));

    const handleTableChange = (type, {data, ...rest}) => {
        console.log(rest)
        setParams(rest)
    }

    if (isLoading || !data) {
        return <Row>Loading</Row>
    }

    const {data:items, page = 1, sizePerPage = 10, totalSize} = data

    return data && (
        <BootstrapTable
            remote
            keyField="id"
            data={items}
            columns={columns}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            pagination={paginationFactory({page, sizePerPage, totalSize})}
            onTableChange={handleTableChange}
        />
    );
}
