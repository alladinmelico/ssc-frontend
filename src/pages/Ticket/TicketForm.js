import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminTickets, newTicket, updateTicket, clearErrors } from "../../actions/ticketActions"
import { NEW_TICKET_RESET, UPDATE_TICKET_RESET } from "../../constants/ticketConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Unsplash from 'components/Unsplash'

export default function TicketForm ({modalClosed, ticket}) {
  const [openModal, setOpenModal] = useState(false)
  const [cover, setCover] = useState('')
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newTicket)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.ticket) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    code: yup.string().required("Code is a required field."),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: ''})
  }

  useEffect(() => {
    if(ticket.id && !openModal) {
      setOpenModal(true)
      setValue('name', ticket.name)
      setValue('code', ticket.code)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_TICKET_RESET })
      dispatch(getAdminTickets(0, 50))
      modalClosed()
      enqueueSnackbar('Ticket successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
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
  }, [dispatch, error, updateError, isUpdated, success, ticket])

  const onSubmit = async data => {
    if (cover) {
      data.cover = JSON.stringify(cover)
    }

    if (ticket.id) {
      dispatch(updateTicket(ticket.id, data))
    } else {
      dispatch(newTicket(data))
    }
  };


  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpenModal(true)}
        size="large"
        aria-label="add"
        style={{ backgroundColor: 'transparent' }}
        startIcon={<AddBoxOutlinedIcon />}
      >
        Add
      </Button>
      <FormModal
        title={ticket && ticket.id ? 'Edit Ticket' : 'Add Ticket'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading || updateLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          resetForm()
      }}>
        <Unsplash selectedPhoto={cover} setSelectedPhoto={setCover} />
        <TextField 
          {...register("name", { required: true, min: 3 })}
          error={errors.name ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={ticket ? ticket.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("code", { required: true, min: 3 })}
          error={errors.code ? true : false}
          label="Code"
          variant="outlined"
          defaultValue={ticket ? ticket.code : ''}
          helperText={errors.code?.message}
          margin="normal"
          fullWidth
        />
      </FormModal>
    </div>
  );
}