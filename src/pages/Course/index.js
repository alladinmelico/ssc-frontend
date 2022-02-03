import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import Box from '@mui/material/Box';
import CourseForm from './CourseForm'
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminCourses,
  deleteCourse,
  clearErrors,
} from "../../actions/courseActions"
import { DELETE_COURSE_RESET } from "../../constants/courseConstants"

const Course = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [course, setCourse] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, courses, count, error } = useSelector((state) => state.courses)
  const { error: deleteError, isDeleted } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(getAdminCourses(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_COURSE_RESET })
      dispatch(getAdminCourses())
      enqueueSnackbar('Course successfully deleted.', {
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
    { field: 'department', headerName: 'department', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon color="primary" />} onClick={() => setCourse(params.row)} label="Edit" />,
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
              dispatch(deleteCourse(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      ]
    },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'course', defaultMessage: 'Course' })}
    >
      <DataTable
        rows={courses}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        <CourseForm course={course} modalClosed={() => setCourse({})} page={page} rowsPerPage={rowsPerPage} />
      </Box>
    </Page>
  );
};
export default Course;
