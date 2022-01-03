import React, { useState } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import API from '../../config/api'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from 'base-shell/lib/providers/Auth'

export default function SubjectModal (props) {
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm(
    { defaultValues: { name: '', code: '' } }
  );
  const { auth } = useAuth()

  const onSubmit = async data => {
    setLoading(true)
    await API.post(`subject`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(res => {
        if (res.status === 201) {
          props.submitted()
          setOpenModal(false)
          reset({ ...data })
        }
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  };


  return (
    <div>
      <FormModal title="Subject" openModal={openModal} setOpenModal={setOpenModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register("name", { required: true, min: 3 })} error={errors.name ? true : false} label="Name" variant="outlined" />
          <Typography variant="inherit" color="textSecondary">
            {errors.name?.message}
          </Typography>

          <TextField {...register("code", { required: true, min: 3 })} error={errors.code ? true : false} label="Code" variant="outlined" />
          <Typography variant="inherit" color="textSecondary">
            {errors.code?.message}
          </Typography>

          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
          >
            Save
          </LoadingButton>
        </form>
      </FormModal>
    </div>
  );
}