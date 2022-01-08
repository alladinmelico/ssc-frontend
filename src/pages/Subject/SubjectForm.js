import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSubjects, newSubject, updateSubject, clearErrors } from "../../actions/subjectActions"
import { NEW_SUBJECT_RESET, UPDATE_SUBJECT_RESET } from "../../constants/subjectConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function SubjectModal (props) {
  const {subject} = props
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newSubject)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.subject) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
  }).required();

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: ''})
  }

  useEffect(() => {
    if(subject.id && !openModal) {
      setOpenModal(true)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      dispatch({ type: NEW_SUBJECT_RESET })
      dispatch(getAdminSubjects())
      setOpenModal(false)
      enqueueSnackbar('Subject successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_SUBJECT_RESET })
      dispatch(getAdminSubjects())
      setOpenModal(false)
      props.modalClosed()
      enqueueSnackbar('Subject successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error,updateError, isUpdated, success, subject, openModal])

  const onSubmit = async data => {
    console.log(data)
    if (subject.id) {
      dispatch(updateSubject(subject.id, data))
    } else {
      dispatch(newSubject(data))
    }
  };


  return (
    <div>
      <FormModal title="Subject" openModal={openModal} setOpenModal={(val) => { 
        setOpenModal(val)
        if (!val) {
          props.modalClosed()
          resetForm()
        }
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField 
            {...register("name", { required: true, min: 3 })}
            error={errors.name ? true : false}
            label="Name"
            variant="outlined"
            defaultValue={subject ? subject.name : ''}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
          />

          <TextField 
            {...register("code", { required: true, min: 3 })}
            error={errors.code ? true : false}
            label="Code"
            variant="outlined"
            defaultValue={subject ? subject.code : ''}
            helperText={errors.code?.message}
            margin="normal"
            fullWidth
          />

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