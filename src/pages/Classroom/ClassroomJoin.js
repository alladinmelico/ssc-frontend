import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useAuth } from 'base-shell/lib/providers/Auth';
import API from '../../config/api'
import { getAdminClassrooms } from "../../actions/classroomActions"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';

export default function ClassroomJoin ({modalClosed, page, rowsPerPage}) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const urlParams = new URLSearchParams(window.location.search);
  const inviteCode = urlParams.get('invite')
  const [openModal, setOpenModal] = useState(!!inviteCode)
  const [code, setCode] = useState(inviteCode)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { auth } = useAuth();

  async function postInvite () {
    setLoading(true)
    await API.post(`classroom/accept/${auth.id}`, {code})
    .then(res => {
      if (res.status === 200) {
        setSuccess(true)
        dispatch(getAdminClassrooms(page, rowsPerPage))
        enqueueSnackbar('Classroom successfully updated.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setError('Invalid invite code.')
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    postInvite()
  };

  useEffect(() => {
    setOpenModal(!!inviteCode)
    setCode(inviteCode)
  }, [inviteCode])

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpenModal(true)}
        aria-label="add"
        style={{ backgroundColor: 'transparent', marginRight: '1rem' }}
        startIcon={<GroupAddOutlinedIcon />}
      >
        Join Classroom
      </Button>
      <FormModal
        title={"Join Classroom"}
        btnType="secondary"
        onSubmit={onSubmit}
        success={success}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
      }}>
        <TextField 
          label="Code"
          variant="outlined"
          value={code}
          required
          onChange={(event) => setCode(event.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
          fullWidth
        />
      </FormModal>
    </div>
  );
}
