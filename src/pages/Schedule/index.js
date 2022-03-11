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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
import { Link } from "react-router-dom"
import ScheduleShow from './ScheduleShow';

const Schedule = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [schedule, setSchedule] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, schedules, count, error } = useSelector((state) => state.schedules)
  const { error: deleteError, isDeleted } = useSelector((state) => state.schedule)

  useEffect(() => {
    dispatch(getAdminSchedules(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
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
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'type', headerName: 'Type', width: 300 },
    { field: 'start_date', headerName: 'Start Date', width: 300 },
    { field: 'end_date', headerName: 'End Date', width: 300 },
    // { field: 'classroom_id', headerName: 'Classroom', width: 300 },
    // { field: 'facility_id', headerName: 'Facility', width: 300 },
    { field: 'start_at', headerName: 'Start Time', width: 300 },
    { field: 'end_at', headerName: 'End Time', width: 300 },
    { field: 'repeat_by', headerName: 'Reapeat by', width: 300 },
    { field: 'days_of_week', headerName: 'Days of Week', width: 300 },
    // { field: 'note', headerName: 'Note', width: 300 },
    // { field: 'attachment', headerName: 'Attachment', width: 300 },
    // { field: 'user_id', headerName: 'User', width: 300 },
    // { field: 'users', headerName: 'Users', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem 
          icon={<Link to={`/schedule/${params.row.id}`} style={{ textDecoration: 'none' }} ><VisibilityOutlinedIcon color="green" /></Link> }
          onClick={() => {
          setEditMode(false)
        }} label="View" />,
        <GridActionsCellItem icon={
          <Link to={`/schedule/${params.row.id}/edit`}>
            <EditOutlinedIcon color="primary" />
          </Link>
        } label="Edit" />,
        <GridActionsCellItem icon={<DeleteOutlinedIcon color="secondary" />} onClick={() => 
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
    history.push('/schedule/create')
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
        <Link to="/schedule/create">
          <Fab onClick={handleOpen} color="primary" aria-label="add" className="fabIcon">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
      <Box>
        {editMode ? (
          <ScheduleForm schedule={schedule} modalClosed={() => setSchedule({})} page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <ScheduleShow schedule={schedule} modalClosed={() => {
            setSchedule({})
            setEditMode(true)
          }} />
        )}
      </Box>
    </Page>
  );
};
export default Schedule;
