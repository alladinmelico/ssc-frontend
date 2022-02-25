import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from "react-redux"
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminTemperatures,
  clearErrors,
} from "../../actions/temperatureActions"
import { DELETE_TEMPERATURE_RESET } from "../../constants/temperatureConstants"

const Temperature = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [temperature, setTemperature] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, temperatures, count, error } = useSelector((state) => state.temperatures)
  const { error: deleteError, isDeleted } = useSelector((state) => state.temperature)

  useEffect(() => {
    dispatch(getAdminTemperatures(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

  }, [dispatch, deleteError, page, rowsPerPage, error])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'temperature', headerName: 'Temperature', width: 150 },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'temperature', defaultMessage: 'Temperature' })}
    >
      <DataTable
        rows={temperatures}
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
