import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux"
import DataTable from '../../components/DataTable';
import { DELETE_RFID_RESET } from "../../constants/rfidConstants"
import RfidForm from './RfidForm';
import RfidShow from './RfidShow';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'

import {
  getAdminRfids,
  deleteRfid,
  clearErrors,
} from "../../actions/rfidActions"


const Rfid = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [rfid, setRfid] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, rfids, count, error } = useSelector((state) => state.rfids)
  const { error: deleteError, isDeleted } = useSelector((state) => state.rfid)

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminRfids(page, rowsPerPage))
    }
    
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_RFID_RESET })
      dispatch(getAdminRfids(page, rowsPerPage))
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
    { field: 'user_name', headerName: 'Name',flex: 1 ,minWidth: 200},
    { field: 'value', headerName: 'Value', width: 150 },
    { field: 'is_logged', headerName: 'Logged', width: 300, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" />} onClick={() => { 
          setRfid(params.row) 
          setEditMode(false)
        }} label="View" />,
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => { 
          setRfid(params.row) 
          setEditMode(true)
        }} label="Edit" />,
        <GridActionsCellItem icon={<DeleteOutlinedIcon color="error" />} onClick={() => 
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
        rows={rfids ? rfids : []}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
       <Box>
        {editMode ? (
          <RfidForm rfid={rfid} modalClosed={() => setRfid({})} page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <RfidShow rfid={rfid} modalClosed={() => {
            setRfid({})
            setEditMode(true)
          }} />
        )}
      </Box>
    </Page>
  );
};
export default Rfid;
