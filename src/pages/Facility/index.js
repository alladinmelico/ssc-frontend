import React, { useEffect, useState } from 'react';
import API from '../../config/api'
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FacilityForm from './FacilityForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminFacilities,
  deleteFacility,
  clearErrors,
} from "../../actions/facilityActions"
import { DELETE_FACILITY_RESET } from "../../constants/facilityConstants"
import FacilityShow from './FacilityShow';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"
import Fab from '@mui/material/Fab';

const Facility = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [facility, setFacility] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  const { error: deleteError, isDeleted } = useSelector((state) => state.facility)

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminFacilities(page, rowsPerPage))
    }
    if (error === 'Unauthenticated.') {
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_FACILITY_RESET })
      dispatch(getAdminFacilities(page, rowsPerPage))
      enqueueSnackbar('Facility successfully Deleted.', {
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
        setFacility(params.row)
        setEditMode(false)
      }} label="View" />,
    ]

    if (role === 1) {
      actions.push(
        <GridActionsCellItem icon={ <Link to={`/facility/${params.row.id}/edit`} style={{ textDecoration: 'none' }}><EditOutlinedIcon color="primary" /></Link>} label="Edit" />,
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
              dispatch(deleteFacility(params.id))
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
    { field: 'code', headerName: 'Code', flex: 0.5 ,minWidth: 300 },
    { field: 'capacity', headerName: 'Capacity', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'building', headerName: 'Building', width: 150 },
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
      pageTitle={intl.formatMessage({ id: 'facility', defaultMessage: 'Facility' })}
    >
      <DataTable
        rows={facilities ? facilities : []}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        <Link to="/facility/create">
          <Fab color="primary" aria-label="add" className="fabIcon">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </Page>
  );
};
export default Facility;
