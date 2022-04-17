import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from "react-redux"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import API from 'config/api'
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
import {useNavigate} from 'react-router-dom';
import MainAppBar from 'components/MainAppBar'
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

const Facility = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [facility, setFacility] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate();
  const { loading, facilities, count, error } = useSelector((state) => state.facilities)
  const { error: deleteError, isDeleted } = useSelector((state) => state.facility)

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminFacilities(page, rowsPerPage))
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

  
  async function restore (id) {
    await API.put(`/facility/${id}/restore`).then(response => {
      if (response.data) {
        dispatch(getAdminFacilities(page, rowsPerPage))
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const role = JSON.parse(localStorage.getItem('auth')).role
  function getActions (params) {
    if (params.row.deleted_at) {
      return [
         <GridActionsCellItem icon={<RestoreFromTrashOutlinedIcon color="success" />} onClick={() => {
          restore(params.row.id)
        }} label="View" />,
      ]
    } 

   const actions = [
      <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" onClick={() => navigate(`/facility/${params.row.id}`)} />}
      label="View" />, 
    ]

    actions.push(
      <GridActionsCellItem icon={ <EditOutlinedIcon color="primary" onClick={() => navigate(`/facility/${params.row.id}/edit`)} />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteOutlinedIcon color="error" />} onClick={() => 
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
    return actions;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'name', headerName: 'Name', flex: 0.5 ,minWidth: 150 },
    { field: 'code', headerName: 'Code', flex: 0.5 ,minWidth: 300 },
    { field: 'capacity', headerName: 'Capacity', width: 150 },
    { field: 'schedules_count', headerName: 'Total Number of Schedules', width: 150 },
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
      appBarContent={<MainAppBar title="Facility" noBack to="/facility/create" />}
    >
      <DataTable
        rows={facilities ? facilities.map(item => ({...item, schedules_count: item.schedules.length})) : []}
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
export default Facility;
