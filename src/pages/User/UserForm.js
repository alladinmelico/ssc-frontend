import API from '../../config/api'
import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminUsers, newUser, updateUser, clearErrors } from "../../actions/userActions"
import { NEW_USER_RESET, UPDATE_USER_RESET } from "../../constants/userConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getAdminCourses } from 'actions/courseActions';
import { getAdminSections } from 'actions/sectionActions';
import { Skeleton } from '@mui/material';
import roles from 'constants/roles'
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export default function UserModal ({modalClosed, user}) {
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { courses } = useSelector((state) => state.courses)
  const { loading : sectionLoading, sections, count } = useSelector((state) => state.sections)
  const [toAddSection, setToAddSection] = useState(user ? user.section : '');
  const [toAddCourse, setToAddCourse] = useState(user ? user.course : {});
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newUser)
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user) 
  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required("Name is a required field."),
    email: yup.string().required("Email is a required field."),
    school_id: yup.string().required("School ID is a required field.").matches(/(TUPT-)\d\d-\d\d\d\d/i, "School ID's format should be: TUPT-**-****"),
    year: yup.number().required("Year must be a number type."),
    role_id: yup.number().nullable()
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', email: '', section_id: '', school_id: '', year: 0, course_id: ''})
  }

  useEffect(() => {
    dispatch(getAdminCourses(0, 50))
    if (!sectionLoading){
      dispatch(getAdminSections(0, 50))
    }
    if(user.id && !openModal) {
      setOpenModal(true)
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('section_id', user)
      setValue('year', user.year)
      setValue('school_id', user.school_id);
      setToAddSection(sections.find(item => item.id === user.section_id))
      setToAddCourse(user.course)
    }

    if (error || updateError) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_USER_RESET })
      dispatch(getAdminUsers(0, 50))
      modalClosed()
      enqueueSnackbar('User successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }

    if (isUpdated) {
      resetForm()     
      dispatch({ type: UPDATE_USER_RESET })
      dispatch(getAdminUsers(0, 50))
      modalClosed() 
      enqueueSnackbar('User successfully updated.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, updateError, isUpdated, success, user])

  const onSubmit = async data => {
    data.section_id = toAddSection.id
    data.course_id = toAddCourse.id
    if (user.id) {
      dispatch(updateUser(user.id, data))
    } else {
      dispatch(newUser(data))
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
        title={user && user.id ? 'Edit User' : 'Add User'}
        onSubmit={handleSubmit(onSubmit)}
        success={success || isUpdated}
        loading={loading || updateLoading}
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
          defaultValue={user ? user.name : ''}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          required
        />

        <TextField 
          {...register("email", { required: true, min: 3 })}
          error={errors.email ? true : false}
          label="Email"
          variant="outlined"
          defaultValue={user ? user.email : ''}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
          required
        />

      <FormControl fullWidth required margin='normal'>
        <InputLabel id="year_select_label">Year</InputLabel>
        <Select
          {...register("year", { required: true, min: 3 })}
          error={errors.year ? true : false}
          labelId="year_select_label"
          id="year-select"
          defaultValue={user ? user.year : ''}
          label="Year">
            <MenuItem value="1">First Year</MenuItem>
            <MenuItem value="2">Second Year</MenuItem>
            <MenuItem value="3">Third Year</MenuItem>
            <MenuItem value="4">Fourth Year</MenuItem>
            </Select>
            </FormControl>

            {count ? (
            <FormControl fullWidth required margin="normal">
              <Autocomplete
              id="section-list"
              name="sections"
              options={sections}
              value={toAddSection}
              getOptionLabel={((option) => option.name)}
              onChange={(event, newVal) => setToAddSection(newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Section"
                  placeholder="Section"
                />
              )}
            />
          </FormControl>
          ) : (
            <Skeleton animation="wave" height={100} />
          )}
        
        {count ? (
        <FormControl fullWidth required margin="normal">
           <Autocomplete
            id="course-list"
            name="courses"
            options={courses}
            value={toAddCourse}
            getOptionLabel={((option) => option.name)}
            onChange={(event, newVal) => setToAddCourse(newVal)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Course"
                placeholder="Course"
              />
            )}
          />
        </FormControl>
        ) : (
          <Skeleton animation="wave" height={100} />
        )}

        <TextField 
          {...register("school_id", { required: true, min: 3 })}
          error={errors.school_id ? true : false}
          label="School ID"
          variant="outlined"
          defaultValue={user ? user.school_id : ''}
          helperText={errors.school_id?.message}
          margin="normal"
          placeholder="TUPT-##-####"
          fullWidth
          required
          />
        
        <FormControl fullWidth required margin="normal">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            {...register("role_id")}
            error={errors.role_id ? true : false}
            labelId="role-select-label"
            id="role-select"
            label="role"
            helperText={errors.role?.message}
            defaultValue={user ? user.role_id : ''}          
          >
            {roles.map(role => (
              <MenuItem value={role.value} key={role.value}>{role.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </FormModal>
    </div>
  );
}