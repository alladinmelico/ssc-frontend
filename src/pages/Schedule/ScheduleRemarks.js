import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useAuth } from 'base-shell/lib/providers/Auth';
import API from '../../config/api'
import { getAdminSchedules } from "../../actions/scheduleActions"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ScheduleRemarks ({schedule, modalClosed}) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isApproved, setIsApproved] = useState(!!schedule.approved_at)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [remarks, setRemarks] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { auth } = useAuth();

  const approve = async id => {
    if (id != null) {
      setLoading(true)
      await API.put(`schedule/${id}/approve`, {
        approve: isApproved,
        remarks
      }).then(res => {
        if (res.status === 200) {
          setSuccess(true)
          dispatch(getAdminSchedules(0, 50))
          enqueueSnackbar('Schedule successfully updated.', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        }
      }).catch(err => {
         if (err.response && err.response.status === 404) {
          setError('Something went wrong, please try again.')
        }
      })
      .finally(() => {
        setLoading(false)
        modalClosed()
      })
    }
  }

  const onSubmit = event => {
    event.preventDefault();
    approve(schedule.id)
  };

  useEffect(() => {
    if (schedule) {
      setOpenModal(true)
      setIsApproved(!!schedule.approved_at)
      setRemarks(schedule.remarks)
    } else {
      setOpenModal(false)
    }
  }, [schedule])

  return (
    <div>
      <FormModal
        title="Schedule Approval"
        btnType="secondary"
        onSubmit={onSubmit}
        success={success}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
      }}>
        <FormControlLabel
          control={
            <Checkbox checked={isApproved} onChange={(event) => setIsApproved(event.target.checked)} name="Approve" />
          }
          label="Approve"
        />
        <TextField 
          label="Remarks"
          variant="outlined"
          value={remarks}
          required
          onChange={(event) => setRemarks(event.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
          fullWidth
        />
      </FormModal>
    </div>
  );
}
