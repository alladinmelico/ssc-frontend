import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import DataTable from '../../components/DataTable';
import { useSnackbar } from 'notistack'
import API from 'config/api';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FormModal from '../../components/Modal/FormModal'
import TextField from '@mui/material/TextField';
import MainAppBar from 'components/MainAppBar'

const Temperature = ({history}) => {
  const [page, setPage] = useState(0)
  const [temperatures, setTemperatures] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [imports, setImports] = useState('')

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

  async function importTemperatures () {
    setLoading(true)
    await API.post(`import-temperature`, {temperatures: imports})
    .then(res => {
      if (res.status === 200) {
        setSuccess(true)
        getData()
        enqueueSnackbar('Temperatures successfully imported.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setError('Invalid invite code.')
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    importTemperatures()
  };

  return (
    <Page
      appBarContent={
        <MainAppBar
          title={intl.formatMessage({ id: 'temperature', defaultMessage: 'Temperature' })}
          noBack
          tools={
            <div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenModal(true)}
                aria-label="add"
                style={{ backgroundColor: 'transparent', marginRight: '1rem' }}
                startIcon={<AddBoxOutlinedIcon />}
              >
                Import Temperatures
              </Button>
              <FormModal
                title={"Import Temperatures"}
                btnType="secondary"
                onSubmit={onSubmit}
                success={success}
                loading={loading}
                openModal={openModal}
                setOpenModal={setOpenModal}
              >
                <TextField 
                  label="Temperatures"
                  variant="outlined"
                  value={imports}
                  required
                  onChange={(event) => setImports(event.target.value)}
                  margin="normal"
                  error={!!error}
                  helperText="Use comma(,) to separate values"
                  fullWidth
                />
              </FormModal>
            </div>
          }
        />
      }
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
