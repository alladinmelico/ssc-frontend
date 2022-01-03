import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import DataTable from '../../components/DataTable';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SubjectForm from './SubjectForm'
import API from '../../config/api'
import { useAuth } from 'base-shell/lib/providers/Auth'

const Subject = () => {
  const { auth } = useAuth()
  const [rows, setRows] = useState([])
  const intl = useIntl();

  const loadData = async (page = 0, limit = 10) => {
    await API.get(`subject?page${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(({data}) => {
        setRows(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'code', headerName: 'Code', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); 

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          return alert(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'subject', defaultMessage: 'Subject' })}
    >
      <DataTable rows={rows} columns={columns} loadData={loadData} />
      <Box>
        <SubjectForm submitted={() => loadData()} />
      </Box>
    </Page>
  );
};
export default Subject;
