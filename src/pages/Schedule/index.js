import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ScheduleForm from './ScheduleForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminSchedules,
  deleteSchedule,
  clearErrors,
} from "../../actions/scheduleActions"
import { DELETE_SCHEDULE_RESET } from "../../constants/scheduleConstants"

const Schedule = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schedule, setSchedule] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, schedules, count, error } = useSelector((state) => state.schedules)
  const { error: deleteError, isDeleted } = useSelector((state) => state.schedule)

  useEffect(() => {
    dispatch(getAdminSchedules(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SCHEDULE_RESET })
      dispatch(getAdminSchedules())
      enqueueSnackbar('Schedule successfully added.', {
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
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'code', headerName: 'Code', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon color="primary" />} onClick={() => setSchedule(params)} label="Edit" />,
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
              dispatch(deleteSchedule(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      ]
    },
  ];

  const handleOpen = () => {
  
  }

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedule' })}
    >
      <DataTable
        rows={schedules}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        <Fab onClick={handleOpen} color="primary" aria-label="add" className="fabIcon">
          <AddIcon />
        </Fab>
      </Box>
    </Page>
  );
};
export default Schedule;
