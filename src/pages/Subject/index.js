import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SubjectForm from './SubjectForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminSubjects,
  deleteSubject,
  clearErrors,
} from "../../actions/subjectActions"
import { DELETE_SUBJECT_RESET } from "../../constants/subjectConstants"

const Subject = () => {
  const [subject, setSubject] = useState({})
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, subjects } = useSelector((state) => state.subjects)
  const { error: deleteError, isDeleted } = useSelector((state) => state.subject)

  useEffect(() => {
    dispatch(getAdminSubjects())

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SUBJECT_RESET })
      dispatch(getAdminSubjects())
      enqueueSnackbar('Subject successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'code', headerName: 'Code', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const edit = (e) => {
          e.stopPropagation(); 

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          return  setSubject(thisRow);
        };

        const deleteItem = (e) => {
          e.stopPropagation(); 

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          return openDialog({
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
              dispatch(deleteSubject(thisRow.id))
              handleClose()
            },
          });
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton  onClick={edit}  color="primary" aria-label="Edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteItem} color="secondary" aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'subject', defaultMessage: 'Subject' })}
    >
      <DataTable rows={subjects} columns={columns} loading={loading} loadData={(page, limit) => dispatch(getAdminSubjects(page, limit))} />
      <Box>
        <SubjectForm subject={subject} modalClosed={() => setSubject({})} />
      </Box>
    </Page>
  );
};
export default Subject;
