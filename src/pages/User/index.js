import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import UserForm from './UserForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminUsers,
  deleteUser,
  clearErrors,
} from "../../actions/userActions"
import { DELETE_USER_RESET } from "../../constants/userConstants"
import API from 'config/api';
import UserShow from './UserShow';

const User = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, users, count, error } = useSelector((state) => state.users)
  const { error: deleteError, isDeleted } = useSelector((state) => state.user)

  const verification = async response => {
    if (response != null) {
      await API.put(`user/${response}/verify`, {
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    dispatch(getAdminUsers(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_USER_RESET })
      dispatch(getAdminUsers(page, rowsPerPage))
      enqueueSnackbar('User successfully deleted.', {
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
    { field: 'email', headerName: 'Email', flex: 0.5 , minWidth: 150 },
    { field: 'year', headerName: 'Year', width: 75 },
    { field: 'section', headerName: 'Section', flex: 0.5 , minWidth: 100 },
    { field: 'school_id', headerName: 'School ID', flex: 0.5 , minWidth: 150 },
    { field: 'role', headerName: 'Role', flex: 0.5 , minWidth: 100 },
    { field: 'course_name', headerName: 'Course', flex: 0.5 , minWidth: 100 },
    { field: 'changes_verified', headerName: 'Status', width: 75 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" />} onClick={() => {
          setUser(params.row)
          setEditMode(false)
        }} label="View" />,
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => {
          setUser(params.row)
          setEditMode(true)
        }} label="Edit" />,
        <GridActionsCellItem icon={<DeleteOutlinedIcon color="secondary" />} onClick={() => 
          openDialog({
            title: intl.formatMessage({
              id: 'delete_dialog_title',
              defaultMessage: 'Delete User',
            }),
            message: intl.formatMessage({
              id: 'delete_dialog_message',
              defaultMessage:
                'Are you sure you want to delete this item?',
            }),
            action: intl.formatMessage({
              id: 'delete_dialog_action',
              defaultMessage: 'YES, Delete',
            }),
            handleAction: (handleClose) => {
              dispatch(deleteUser(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
        <GridActionsCellItem icon={<VerifiedIcon color="secondary" />} onClick={() => 
            openDialog({
              title: intl.formatMessage({
                id: 'verify_dialog_title',
                defaultMessage: 'Verify User',
              }),
              message: intl.formatMessage({
                id: 'verify_dialog_message',
                defaultMessage:
                  'Are you sure you want to verify this user?',
              }),
              action: intl.formatMessage({
                id: 'verify_dialog_action',
                defaultMessage: 'Verify',
              }),
              handleAction: (handleClose) => {
                verification(params.id)
                handleClose()
              },
            })
          } label="Verify" />,
      ]
    },
  ];

  function getRole(role) {
    switch (role) {
      case 1:
        return 'Admin'
      case 2:
        return 'Faculty'
      case 3:
        return 'Student'
      case 4:
        return 'Guest'
      default:
        return 'n/a';
    }
  }

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'user', defaultMessage: 'User' })}
    >
      <DataTable
        rows={users.map(user => ({...user, section:user.section?.name, course_name: user.course?.code, role: getRole(user.role_id) }))}
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
          <UserForm user={user} modalClosed={() => setUser({})} page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <UserShow user={user} modalClosed={() => {
            setUser({})
            setEditMode(true)
          }} />
        )}
      </Box>
    </Page>
  );
};
export default User;
