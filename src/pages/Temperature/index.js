import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import DataTable from '../../components/DataTable';
import { useSnackbar } from 'notistack'
import API from 'config/api';

const Temperature = ({history}) => {
  const [page, setPage] = useState(0)
  const [temperatures, setTemperatures] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar()

  const getData = async () => {
    setLoading(true)
    await API.get(`temperature?page=${page}&limit=${rowsPerPage}`).then(res => {
      setTemperatures(res.data.data)
      setCount(res.data.data.length)
      setLoading(false)
    }).catch(err => {
    })
  }

  useEffect(() => {
    if (count === 0) {
      window.echo.channel('temperature').listen('UserTemperature', (e) => {
        enqueueSnackbar(`${e.temperature.user.name} recorded ${e.temperature.temperature}.`, {variant: 'info'})  
        setTemperatures(prev => [e.temperature, ...prev])
      })
    }
    getData()    
  }, [count, page, rowsPerPage])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'user_name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'temperature', headerName: 'Temperature', width: 150 },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'temperature', defaultMessage: 'Temperature' })}
    >
      <DataTable
        rows={temperatures.map(temp => ({...temp, user_name:  temp.user?.name}))}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Page>
  );
};
export default Temperature;
