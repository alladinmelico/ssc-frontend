import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import API from '../../config/api'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from 'base-shell/lib/providers/Auth'

export default function ProfileForm (props) {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm(
    { 
      defaultValues: { 
        name: auth.name,
        email: '@tup.edu.ph',
        school_id: 'TUPT-**-****',
        course_id: '1',
        year: 1,
        section: 2
      }
    }
  );

  const onSubmit = async data => {
    setLoading(true)
    await API.post(`profile-registration`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
        props.onSubmitHandler()
      })
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("name", { required: true, min: 3 })} error={errors.name ? true : false} label="Name" variant="outlined" />
      <Typography variant="inherit" color="textSecondary">
        {errors.name?.message}
      </Typography>

      <TextField {...register("email", { required: true, min: 3 })} error={errors.email ? true : false} label="Email" variant="outlined" />
      <Typography variant="inherit" color="textSecondary">
        {errors.email?.message}
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
  );
}