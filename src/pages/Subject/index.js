import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SubjectForm from './SubjectForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminSubjects,
  deleteSubject,
  clearErrors,
} from "../../actions/subjectActions"
import { DELETE_SUBJECT_RESET } from "../../constants/subjectConstants"
import SubjectShow from './SubjectShow';

const Subject = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [subject, setSubject] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, subjects, count, error } = useSelector((state) => state.subjects)
  const { error: deleteError, isDeleted } = useSelector((state) => state.subject)
  const role = JSON.parse(localStorage.getItem('auth')).role

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminSubjects(page, rowsPerPage))
    }
    
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SUBJECT_RESET })
      dispatch(getAdminSubjects(page, rowsPerPage))
      enqueueSnackbar('Subject successfully deleted.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted, page, rowsPerPage, error])

  

  function getActions (params) {
    const actions = [
      <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" />} onClick={() => {
        setSubject(params.row)
        setEditMode(false)
      }} label="View" />,    
    ]

    if (role === 1) {
      actions.push(
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => {
          setSubject(params.row)
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
              dispatch(deleteSubject(params.id))
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
    { field: 'code', headerName: 'Code', flex: 0.5 , minWidth: 300 },
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
      pageTitle={intl.formatMessage({ id: 'subject', defaultMessage: 'Subject' })}
    >
      <DataTable
        rows={subjects ? subjects : []}
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
          <SubjectForm subject={subject} modalClosed={() => setSubject({})} page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <SubjectShow subject={subject} modalClosed={() => {
            setSubject({})
            setEditMode(true)
          }} />
        )}
      </Box>
    </Page>
  );
};
export default Subject;
