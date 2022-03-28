import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSections, newSection, updateSection, clearErrors } from "../../actions/sectionActions"
import { NEW_SECTION_RESET, UPDATE_SECTION_RESET } from "../../constants/sectionConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton } from '@mui/material';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from "yup"
import {
  allUsers
} from "../../actions/userActions"
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export default function SectionModal ({modalClosed, section}) {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const { users, count  } = useSelector((state) => state.allUsers)
  const [toAddPresident, setToAddPresident] = useState(section? section.user : {});
  const [toAddFaculty, setToAddFaculty] = useState(section? section.user : {});
  const { loading, error, success } = useSelector((state) => state.newSection)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.section) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required("Name is a required field.")
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', president_id: 0, faculty_id: 0})
    setToAddFaculty('')
    setToAddPresident('')
  }

  const clearForm = () => {
    reset({ name: ''})
  }

  const { loading: userLoading } = useSelector((state) => state.allUsers)

  useEffect(() => {  
    if (!count) {
      dispatch(allUsers())
    }
    
    if(section.id && !openModal) {
      setOpenModal(true)
      setValue('name', section.name)
      setToAddPresident(users.find(item => item.id === section.president.id))
      setToAddFaculty(users.find(item => item.id === section.faculty.id))
      // setToAddPresident(section.find(item => item.id === section.president_id))
    }

   
    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_SECTION_RESET })
      dispatch(getAdminSections(0, 50))
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
      dispatch(getAdminSections(0, 50))
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
    data.president_id = toAddPresident.id
    data.faculty_id = toAddFaculty.id
    if (section.id) {
      dispatch(updateSection(section.id, data))
    } else {
      dispatch(newSection(data))
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
        title={section && section.id ? 'Edit Section' : 'Add Section'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading || updateLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelled={() => {
          modalClosed()
          clearForm()
      }}>
        <TextField 
          {...register("name")}
          error={errors.name ? true : false}
          label="Name"
          variant="outlined"
          defaultValue={section ? section.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
        />

        {users && users.length ? (
        <FormControl fullWidth required margin="normal">
          <Autocomplete
            id="presidents-list"
            name="presidents"
            options={users.filter(item => item.role_id === 5 )}
            value={toAddPresident}
            getOptionLabel={((option) => option.name)}
            onChange={(event, newVal) => setToAddPresident(newVal)}
            helperText={errors.president_id?.message}
            renderInput={(params) => (
              <TextField
                {...params}
                label="President"
                placeholder="President"
              />
            )}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

      {users && users.length ? (
        <FormControl fullWidth required margin="normal">
          <Autocomplete
            id="faculty-list"
            name="faculty"
            options={users.filter(item => item.role_id === 2 )}
            value={toAddFaculty}
            getOptionLabel={((option) => option.name)}
            onChange={(event, newVal) => setToAddFaculty(newVal)}
            helperText={errors.faculty_id?.message}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Faculty"
                placeholder="Faculty"
              />
            )}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}
      </FormModal>
    </div>
  );
}