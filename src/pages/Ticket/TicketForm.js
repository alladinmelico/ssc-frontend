import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useDispatch, useSelector } from "react-redux"
import { getAdminTickets, updateTicket, clearErrors } from "../../actions/ticketActions"
import { useSnackbar } from 'notistack'
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {PRIORITIES, STATUSES} from 'constants/ticket'
import { UPDATE_TICKET_RESET } from "constants/ticketConstants"

export default function TicketForm ({modalClosed, ticket}) {
  const [openModal, setOpenModal] = useState(false)
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch()
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.ticket) 
  const { enqueueSnackbar } = useSnackbar()

  function resetForm () {
    setPriority('')
    setStatus('')
    setErrors('')
  }

  useEffect(() => {
    if(ticket) {
      setOpenModal(true)
      setStatus(ticket.status)
      setPriority(ticket.priority)
    }

    if (updateError) {
      dispatch(clearErrors())
    }

    if (isUpdated) {
      resetForm()     
      modalClosed() 
      dispatch({ type: UPDATE_TICKET_RESET })
      dispatch(getAdminTickets(0, 50))
      enqueueSnackbar('Ticket successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, updateError, isUpdated])

  const onSubmit = event => {
    event.preventDefault();
    if (ticket.id) {
      dispatch(updateTicket(ticket.id, {status, priority}))
    }
  };

  return (
    <FormModal
      title="Edit Ticket" 
      onSubmit={onSubmit}
      success={isUpdated}
      loading={updateLoading}
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={() => {
        modalClosed()
        resetForm()
    }}>
      <FormControl fullWidth margin="normal">                    
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Status"
          error={errors.status}
          onChange={(event) => {
            setErrors('')
            setStatus(event.target.value)
          }}
          m={2}
        >
          {STATUSES.map(item => (
            <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
        {errors && errors.status && (
          <FormHelperText error id="status-helper-text">{errors.status}</FormHelperText>                    
        )}
      </FormControl>  

      <FormControl fullWidth margin="normal">                    
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={priority}
          label="Priority"
          error={errors.priority}
          onChange={(event) => {
            setErrors('')
            setPriority(event.target.value)
          }}
          m={2}
        >
          {PRIORITIES.map(item => (
            <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
        {errors && errors.priority && (
          <FormHelperText error id="priority-helper-text">{errors.priority}</FormHelperText>                    
        )}
      </FormControl>  
    </FormModal>
  );
}