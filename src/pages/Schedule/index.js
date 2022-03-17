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
    if (!loading) {
      dispatch(getAdminSchedules(page, rowsPerPage))
    }
    
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SCHEDULE_RESET })
      dispatch(getAdminSchedules(page, rowsPerPage))
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
    { field: 'id', headerName: 'ID', type: 'number'},
    { field: 'title', headerName: 'Title', flex: 1 , minWidth: 150},
    { field: 'start_date', headerName: 'Start Date'},
    { field: 'end_date', headerName: 'End Date'},
    { field: 'start_at', headerName: 'Start Time'},
    { field: 'end_at', headerName: 'End Time'},
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
        rows={schedules ? schedules : []}
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
    </Page>
  );
};
export default Schedule;
