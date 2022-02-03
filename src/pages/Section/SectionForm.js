import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSections, newSection, updateSection, clearErrors } from "../../actions/sectionActions"
import { NEW_SECTION_RESET, UPDATE_SECTION_RESET } from "../../constants/sectionConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

export default function SectionModal ({page, rowsPerPage, modalClosed, section}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newSection)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.section) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    president_id: yup.string().required(),
    faculty_id: yup.string().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', president_id: 0, faculty_id: 0})
  }

  useEffect(() => {
    if(section.id && !openModal) {
      setOpenModal(true)
      setValue('name', section.name)
      setValue('president_id', section.president_id)
      setValue('faculty_id', section.faculty_id)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_SECTION_RESET })
      dispatch(getAdminSections(page, rowsPerPage))
      modalClosed()
      enqueueSnackbar('Section successfully added.', {
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
      dispatch({ type: UPDATE_SECTION_RESET })
      dispatch(getAdminSections())
      enqueueSnackbar('Section successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, section])

  const onSubmit = async data => {
    console.log(data)
    if (section.id) {
      dispatch(updateSection(section.id, data))
    } else {
      dispatch(newSection(data))
    }
  };


  return (
    <div>
      <FormModal
        title={section ? 'Add Section' : 'Add Section'}
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
          defaultValue={section ? section.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        <TextField 
          {...register("president_id", { required: true, min: 3 })}
          error={errors.president_id ? true : false}
          label="President"
          variant="outlined"
          defaultValue={section ? section.president_id : ''}
          helperText={errors.president_id?.message}
          margin="normal"
          fullWidth
          type="number"
        />

      <TextField 
          {...register("faculty_id", { required: true, min: 3 })}
          error={errors.faculty_id ? true : false}
          label="Faculty"
          variant="outlined"
          defaultValue={section ? section.faculty_id : ''}
          helperText={errors.faculty_id?.message}
          margin="normal"
          fullWidth
          type="number"
        />
      </FormModal>
    </div>
  );
}