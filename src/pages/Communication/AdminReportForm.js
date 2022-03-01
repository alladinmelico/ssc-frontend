import API from '../../config/api'
import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from 'base-shell/lib/providers/Auth'

export default function AdminReportModal ({openModal, setOpenModal, modalClosed}) {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [reason, setReason] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const reasons = [
    'RFID scanner issue',
    'Temperature Scanner issue',
    'No Data displaying on the monitor',
    'Wrong data on display',
    'Computer shuts down',
  ]

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    await API.post(`admin-report`, {message, reason}, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        enqueueSnackbar('Report successfully sent.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
    })
    .catch(err => {
      enqueueSnackbar('Sending Report failed.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    })
    .finally(() => {
      clearValues()
    })
  };

  function clearValues () {
    setLoading(false)
    setOpenModal(false)
    setMessage('')
    setReason('')
    modalClosed()
  }

  return (
    <div>
      <FormModal
        title="Submit a Report to Admin"
        onSubmit={onSubmit}
        openModal={openModal}
        loading={loading}
        success={success}
        setOpenModal={setOpenModal}
        noFab={true}
        cancelled={() => {
          clearValues()
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          fullWidth
        />

        <FormControl fullWidth required margin="normal">
          <InputLabel id="reasons-select-label">Reason</InputLabel>
          <Select
            id="reason-select"
            label="reasons"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            {reasons.map((reason, index) => (
              <MenuItem value={reason} key={index}>{reason}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormModal>
    </div>
  );
}