import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import CourseForm from './CourseForm'
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminCourses,
  deleteCourse,
  clearErrors,
} from "../../actions/courseActions"
import { DELETE_COURSE_RESET } from "../../constants/courseConstants"
import CourseShow from './CourseShow';
import MainAppBar from 'components/MainAppBar'

const Course = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [course, setCourse] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, courses, count, error } = useSelector((state) => state.courses)
  const { error: deleteError, isDeleted } = useSelector((state) => state.course)

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminCourses(page, rowsPerPage))
    }
    
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_COURSE_RESET })
      dispatch(getAdminCourses(page, rowsPerPage))
      enqueueSnackbar('Course successfully deleted.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted, page, rowsPerPage, error])

  const role = JSON.parse(localStorage.getItem('auth')).role
  function getActions (params) {
    const actions = [
      <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" />} onClick={() => {
        setCourse(params.row)
        setEditMode(false)
      }} label="View" />,   
    ]

    if (role === 1) {
      actions.push(
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => {
          setCourse(params.row)
          setEditMode(true)
        }} label="Edit" />,
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
              dispatch(deleteCourse(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      )
    }

    return actions;
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'name', headerName: 'Name', flex: 0.5 ,minWidth: 150 },
    { field: 'code', headerName: 'Code', width: 300 },
    { field: 'department', headerName: 'Department', flex: 0.5 , minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions
    },
  ];

  return (
    <Page
      appBarContent={
        <MainAppBar
          title={intl.formatMessage({ id: 'course', defaultMessage: 'Course' })}
          noBack
          modal={
            editMode ? (
              <CourseForm course={course} modalClosed={() => setCourse({})} page={page} rowsPerPage={rowsPerPage} />
            ) : (
              <CourseShow course={course} modalClosed={() => {
                setCourse({})
                setEditMode(true)
              }} />
            )
          }
        />
    }>
      <DataTable
        rows={courses ? courses : []}
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
export default Course;
