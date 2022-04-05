import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import TicketForm from './TicketForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {useNavigate} from 'react-router-dom';
import API from 'config/api'
import {
  getAdminTickets,
  deleteTicket,
  clearErrors,
} from "../../actions/ticketActions"
import { DELETE_TICKET_RESET } from "../../constants/ticketConstants"
import MainAppBar from 'components/MainAppBar'
import {PRIORITIES, STATUSES} from 'constants/ticket'

const Ticket = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [ticket, setTicket] = useState('')
  const [editMode, setEditMode] = useState(true)
  const navigate = useNavigate();

  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, tickets, count, error } = useSelector((state) => state.tickets || {})
  const { error: deleteError, isDeleted } = useSelector((state) => state.ticket || {})

  useEffect(() => {
    if (!count) {
      dispatch(getAdminTickets(page, rowsPerPage))
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_TICKET_RESET })
      dispatch(getAdminTickets(page, rowsPerPage))
      enqueueSnackbar('Ticket successfully deleted.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted, page, rowsPerPage])


  function getActions (params) {
    return [
      <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => {
          setTicket(params.row)
          setEditMode(true)
        }} label="Edit" />,
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
            dispatch(deleteTicket(params.id))
            handleClose()
          },
        })
      } label="Delete" />,      
    ]
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'ticket_id', headerName: 'Ticket ID', minWidth: 300, type: 'number'},
    { field: 'title', headerName: 'Title', flex: 1 ,minWidth: 300 },
    { field: 'category', headerName: 'Category', flex: 0.5 , minWidth: 300 },
    { field: 'priority_label', headerName: 'Priority' },
    { field: 'status_label', headerName: 'Status' },
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
          title={intl.formatMessage({ id: 'ticket', defaultMessage: 'Ticket' })}
          noBack
        />
    }>
      <DataTable
        rows={tickets ? tickets.map(item => ({...item,
          priority_label: PRIORITIES.find(val => val.value === item.priority)?.label,
          status_label: STATUSES.find(val => val.value === item.status)?.label})) : []}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      {ticket && (
        <TicketForm ticket={ticket} modalClosed={() => {
          setTicket('')
          setEditMode(true)
        }} />
      )}
    </Page>
  );
};
export default Ticket;
