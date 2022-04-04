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
import Page from 'material-ui-shell/lib/containers/Page'
import { Box, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function AdminReportModal () {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const categorys = [
    'RFID scanner issue',
    'Temperature Scanner issue',
    'No Data displaying on the monitor',
    'Wrong data on display',
    'Computer shuts down',
  ]

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    await API.post(`ticket`, {message, category, title})
    .then(res => {
      if (res.status === 201) {
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
    setTitle('')
    setMessage('')
    setCategory('')
  }

  return (
     <Page pageTitle="Report a Bug">
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="sm" >
          <form onSubmit={onSubmit}>
            <TextField
              id="outlined-multiline-static"
              label="Title"
              rows={5}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
              margin="normal"
              required
            />

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
              <InputLabel id="categorys-select-label">Category</InputLabel>
              <Select
                id="category-select"
                label="categorys"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categorys.map((category, index) => (
                  <MenuItem value={category} key={index}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SendOutlinedIcon />}
              variant="contained"
              type="submit"
            >
              Report
            </LoadingButton>
          </form>
        </Container>
      </Box>
    </Page>
  );
}