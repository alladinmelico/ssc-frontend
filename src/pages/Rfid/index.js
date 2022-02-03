import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import RfidForm from './RfidForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminRfids,
  deleteRfid,
  clearErrors,
} from "../../actions/rfidActions"
import { DELETE_RFID_RESET } from "../../constants/rfidConstants"

const Rfid = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rfid, setRfid] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, rfids, count, error } = useSelector((state) => state.rfids)
  const { error: deleteError, isDeleted } = useSelector((state) => state.rfid)

  useEffect(() => {
    dispatch(getAdminRfids(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_RFID_RESET })
      dispatch(getAdminRfids())
      enqueueSnackbar('Rfid successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted, page, rowsPerPage, error])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'user_name', headerName: 'Name', width: 200},
    { field: 'value', headerName: 'Value', width: 150 },
    { field: 'is_logged', headerName: 'Logged', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon color="primary" />} onClick={() => setRfid(params.row)} label="Edit" />,
        <GridActionsCellItem icon={<DeleteIcon color="secondary" />} onClick={() => 
          openDialog({
            title: intl.formatMessage({
              id: 'dialog_title',
              defaultMessage: 'Dialog Item',
            }),
            message: intl.formatMessage({
              id: 'dialog_message',
              defaultMessage:
                'Are you sure you want to delete this item?',
            }),
            action: intl.formatMessage({
              id: 'dialog_action',
              defaultMessage: 'YES, Delete',
            }),
            handleAction: (handleClose) => {
              dispatch(deleteRfid(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      ]
    },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'rfid', defaultMessage: 'Rfid' })}
    >
      <DataTable
        rows={rfids}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        <RfidForm rfid={rfid} modalClosed={() => setRfid({})}page={page} rowsPerPage={rowsPerPage}/>
      </Box>
    </Page>
  );
};
export default Rfid;
