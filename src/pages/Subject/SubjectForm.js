import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSubjects, newSubject, updateSubject, clearErrors } from "../../actions/subjectActions"
import { NEW_SUBJECT_RESET, UPDATE_SUBJECT_RESET } from "../../constants/subjectConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function SubjectModal ({page, rowsPerPage, modalClosed, subject}) {
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
    if(subject.id && !openModal) {
      setOpenModal(true)
      setValue('name', subject.name)
      setValue('code', subject.code)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_SUBJECT_RESET })
      dispatch(getAdminSubjects(page, rowsPerPage))
      modalClosed()
      enqueueSnackbar('Subject successfully added.', {
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
      dispatch({ type: UPDATE_SUBJECT_RESET })
      dispatch(getAdminSubjects())
      enqueueSnackbar('Subject successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, subject])

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
      <FormModal
        title={subject && subject.id ? 'Edit Subject' : 'Add Subject'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          resetForm()
      }}>
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
      </FormModal>
    </div>
  );
}