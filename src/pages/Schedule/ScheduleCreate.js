import React, { useState, useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page';
import { useIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import { getAdminSchedules, clearErrors } from "../../actions/scheduleActions"
import { NEW_SCHEDULE_RESET } from "../../constants/scheduleConstants"
import { useSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import ScheduleStepper from 'components/ScheduleStepper';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

export default function ScheduleCreate () {
  const intl = useIntl();
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()
  
  const { loading, error, success } = useSelector((state) => state.newSchedule)

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

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedule' })}
    >
      <ScheduleStepper activeStep={activeStep} />

      <Box sx={{ maxWidth: 'sm' }} m="auto" mt={5}>
        {activeStep === 0 && <Step1 activeStep={activeStep} setActiveStep={setActiveStep} />}
        {activeStep === 1 && <Step2 activeStep={activeStep} setActiveStep={setActiveStep} />}
      </Box>
    </Page>
  );
}