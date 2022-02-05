import React, { useState, useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page';
import { useIntl } from 'react-intl';
import FormModal from '../../components/Modal/FormModal'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useDispatch, useSelector } from "react-redux"
import { getAdminSchedules, newSchedule, updateSchedule, clearErrors } from "../../actions/scheduleActions"
import { NEW_SCHEDULE_RESET, UPDATE_SCHEDULE_RESET } from "../../constants/scheduleConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import ScheduleStepper from 'components/ScheduleStepper';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

export default function ScheduleCreate ({match}) {
  const intl = useIntl();
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  
  const { loading, error, success } = useSelector((state) => state.newSchedule)

  const { auth } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const schema = yup.object({
    name: yup.string().required(),
    code: yup.string().required(),
  }).required();

  const { register, handleSubmit, reset, setError, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const resetForm = () => {
    reset({ name: '', code: ''})
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (success) {
      resetForm()
      dispatch({ type: NEW_SCHEDULE_RESET })
      dispatch(getAdminSchedules())
      enqueueSnackbar('Schedule successfully added.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, error, success, enqueueSnackbar])

  const onSubmit = async data => {
    dispatch(newSchedule(data))
  };


  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedule' })}
    >
      <ScheduleStepper activeStep={activeStep} setActiveStep={setActiveStep}>
        <form onSubmit={onSubmit}>
          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && <Step2 />}
        </form>
      </ScheduleStepper>
    </Page>
  );
}