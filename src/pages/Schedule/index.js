import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
import {useNavigate} from 'react-router-dom';
import MainAppBar from 'components/MainAppBar'
import { useAuth } from 'base-shell/lib/providers/Auth'
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import ScheduleRemarks from './ScheduleRemarks';

const Schedule = ({history}) => {
  const [selectedSchedule, setSelectedSchedule] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { auth } = useAuth()
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate();
  const { loading, schedules, count, error } = useSelector((state) => state.schedules)
  const { error: deleteError, isDeleted } = useSelector((state) => state.schedule)

  function getActions (params) {
    const actions = [
      <GridActionsCellItem 
        icon={<VisibilityOutlinedIcon color="green" onClick={() => navigate(`/schedule/${params.row.id}`)}/>} label="View" />,
      <GridActionsCellItem icon={
        <EditOutlinedIcon color="primary" onClick={() => navigate(`/schedule/${params.row.id}/edit`)}/>
      } label="Edit" />,
      <GridActionsCellItem icon={<DeleteOutlinedIcon color="error" />} onClick={() => 
        openDialog({
          title: "Delete Schedule",
          message: `Are you sure you want to delete ${params.row.title}?`,
          action: intl.formatMessage({
            id: 'dialog_action',
            defaultMessage: 'YES, Delete',
          }),
          handleAction: (handleClose) => {
            dispatch(deleteSchedule(params.id))
            handleClose()
          },
        })
      } label="Delete" />
    ]
    if (auth.id === params.row.approver) {
      actions.push(
        <GridActionsCellItem icon={<BeenhereOutlinedIcon color="success" />} onClick={() => 
          setSelectedSchedule(params.row)
        } label="Verify" />
      )  
    }
    return actions
  }

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminSchedules(page, rowsPerPage))
    }
    
    if (deleteError) {
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SCHEDULE_RESET })
      dispatch(getAdminSchedules(page, rowsPerPage))
      enqueueSnackbar('Schedule successfully deleted.', {
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
    { field: 'status', headerName: 'Approved', type: 'boolean'},
    { field: 'remarks', headerName: 'Remarks', minWidth: 200},
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      minWidth: 200,
      getActions
    },
  ];

  return (
    <Page
      appBarContent={
        <MainAppBar
          title={intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedule' })}
          to="/schedule/create"
        />}
    >
      <DataTable
        rows={schedules ? schedules.map(item => ({...item, status: !!item.approved_at})) : []}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      {selectedSchedule && (
        <ScheduleRemarks schedule={selectedSchedule} modalClosed={() => setSelectedSchedule('')} />
      )}
    </Page>
  );
};
export default Schedule;
