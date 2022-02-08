import React, { useState, useEffect } from 'react'
import Page from 'material-ui-shell/lib/containers/Page';
import { useIntl } from 'react-intl';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import { getAdminSchedules, clearErrors } from "../../actions/scheduleActions"
import { NEW_SCHEDULE_RESET } from "../../constants/scheduleConstants"
import { useSnackbar } from 'notistack'
import ScheduleStepper from 'components/ScheduleStepper';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import {
  getScheduleDetails
} from "../../actions/scheduleActions"
import { NEW_SCHEDULE_REQUEST } from "../../constants/scheduleConstants"
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';

export default function ScheduleForm ({ match }) {
  const intl = useIntl();
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()
  
  const { id } = useParams();

  const { loading: loadingDetails, schedule, error: errorDetails } = useSelector((state) => state.scheduleDetails)

  const { loading, error, success } = useSelector((state) => state.newSchedule)

  const { enqueueSnackbar } = useSnackbar()

  const scheduleId = schedule.id

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (scheduleId) {
      dispatch({
        type: NEW_SCHEDULE_REQUEST,
        payload: {
          ...schedule,
        }
      })
    } else if (id && !loadingDetails) {
      dispatch(getScheduleDetails(id))
    }

    if (success) {
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
  }, [dispatch, error, success, enqueueSnackbar, id, scheduleId])

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedule' })}
    >
      <ScheduleStepper activeStep={activeStep} />

      {loadingDetails ? (
        <Box sx={{ maxWidth: 'sm' }} m="auto" mt={5}>
          <Skeleton variant="rectangular" height={118} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="rectangular" height={118} animation="wave" sx={{ my: 2  }} />
          <Skeleton variant="rectangular" height={118} animation="wave" sx={{ my: 2  }} />
        </Box>
      ): (
        <Box sx={{ maxWidth: activeStep === 2 ? 'md' : 'sm' }} m="auto" mt={5}>
          {activeStep === 0 && <Step1 activeStep={activeStep} setActiveStep={setActiveStep} />}
          {activeStep === 1 && <Step2 activeStep={activeStep} setActiveStep={setActiveStep} />}
          {activeStep === 2 && <Step3 activeStep={activeStep} setActiveStep={setActiveStep} />}
          {activeStep === 3 && <Step4 activeStep={activeStep} setActiveStep={setActiveStep} />}
          {activeStep === 4 && <Step5 activeStep={activeStep} setActiveStep={setActiveStep} />}
        </Box>
      )}
    </Page>
  );
}