import React from 'react';
import { MDBTable } from 'mdbreact';
import PropTypes from "prop-types";

const TableList = ({events}) => {
const data_people = {
columns: [
{
    label: 'Title',
    field: 'title',
    sort: 'asc',
},
{
    label: 'type',
    field: 'type',
    sort: 'asc',
},
{
    label: 'start date',
    field: 'startDate',
    sort: 'asc',
},
{
    label: 'end date',
    field: 'endDate',
    sort: 'asc',
},
{
    label: 'created at',
    field: 'createdAt',
    sort: 'asc',
},
{
    label: 'confirmed at',
    field: 'confirmedAt',
    sort: 'asc',
},
{
    label: 'note',
    field: 'memberNote',
    sort: 'asc',
}
],
rows: events

};
return(
    <MDBTable
    striped
    bordered
    small
    data={data_people}
    /> 
   
    );
    };

TableList.propTypes = {
    events: PropTypes.array
};

TableList.defualtProps = {
    events: []
};

export default TableList;