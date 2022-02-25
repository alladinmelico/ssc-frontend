import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import Box from '@mui/material/Box';
import ClassroomForm from './ClassroomForm'
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminClassrooms,
  deleteClassroom,
  clearErrors,
} from "../../actions/classroomActions"
import { DELETE_CLASSROOM_RESET } from "../../constants/classroomConstants"

const Classroom = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [classroom, setClassroom] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, classrooms, count, error } = useSelector((state) => state.classrooms)
  const { error: deleteError, isDeleted } = useSelector((state) => state.classroom)

  useEffect(() => {
    dispatch(getAdminClassrooms(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_CLASSROOM_RESET })
      dispatch(getAdminClassrooms())
      enqueueSnackbar('Classroom successfully deleted.', {
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
    { field: 'name', headerName: 'Name', flex: 0.5 , minWidth: 150 },
    { field: 'description_heading', headerName: 'Description Heading', flex: 0.5 ,minWidth: 300 },
    { field: 'description', headerName: 'Description', flex: 0.5 ,minWidth: 150 },
    { field: 'google_classroom_id', headerName: 'Google Classroom ID', width: 150 },
    { field: 'section', headerName: 'Section', width: 150 },
    { field: 'subject_name', headerName: 'Subject', flex: 0.5 , minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => setClassroom(params.row)} label="Edit" />,
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
              dispatch(deleteClassroom(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      ]
    },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'classroom', defaultMessage: 'Classroom' })}
    >
      <DataTable
        rows={classrooms}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        <ClassroomForm classroom={classroom} modalClosed={() => setClassroom({})} page={page} rowsPerPage={rowsPerPage} />
      </Box>
    </Page>
  );
};
export default Classroom;
