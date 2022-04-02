import React, { useEffect, useState  } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import FileUpload from "react-mui-fileuploader"
import TextField from '@mui/material/TextField';
import { NEW_SCHEDULE_REQUEST } from "../../../constants/scheduleConstants"
import PrevNextButtons from './PrevNextButtons';
import { Typography } from '@mui/material';
import {
  newSchedule,
  updateSchedule,
  clearErrors,
} from "../../../actions/scheduleActions"

export default function Step4({history, activeStep, setActiveStep}) {
  const [oldAttachment, setOldAttachment] = useState('');
  const [attachment, setAttachment] = useState('');
  const [note, setNote] = useState('');
  const dispatch = useDispatch()
  const { schedule } = useSelector((state) => state.newSchedule)

  const saveData = () => {
    dispatch({
      type: NEW_SCHEDULE_REQUEST,
      payload: {
        ...schedule,
        note,
        attachment
      }
    })
  }
  const submit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    Object.entries(schedule).filter(([key, value]) => !['attachment', 'users', 'days_of_week'].includes(key)).map(([key, value]) => {
      if (key.includes('is_')) {
        return formData.append(key, (value ? 1 : 0))
      }
      return formData.append(key, value)
    })

    if (typeof schedule.classroom_id === 'object') {
      formData.delete('classroom_id')
    }

    if (!schedule.repeat_by?.length) {
      formData.delete('repeat_by')
    }
    
    if (!schedule.classroom_id) {
      formData.delete('classroom_id')
    }
    
    if (schedule.users) {
      const value = schedule.users
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < value[i].length; j++) {
          formData.append(`users[${i}][]`, value[i][j])
        }
      }
    }

    if (schedule.days_of_week) {
      for (let i = 0; i < schedule.days_of_week.length; i++) {
        formData.append('days_of_week[]', schedule.days_of_week[i]);
      }
    }

    if (attachment) {
      formData.append('attachment', attachment)
    }

    formData.append('note', note)

    if (schedule.id) {
      formData.append('_method', 'PUT')
      dispatch(updateSchedule(schedule.id, formData))
    } else {
      dispatch(newSchedule(formData))
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  
  const handleFileUploadError = (error) => {
    // Do something...
  }
  
  const handleFilesChange = (files) => {
    if (files.length > 0) {
      const file = files.pop()

      if (file && file.path) {
        fetch(file.path)
        .then(res => res.blob())
        .then(blob => {
          const fileObj = new File([blob], file.name,{ type: file.contentType })
          setAttachment(fileObj)
        })
      }    
    }
  }

  useEffect(() => {
    if (schedule) {
      setNote(schedule.note ? schedule.note : '')
      setOldAttachment(schedule.attachment ? schedule.attachment : '')
    }
  }, [dispatch, history, schedule])

  return (
    <Box sx={{ minWidth: 120 }}>
      <form onSubmit={submit} encType="multipart/form-data">
        <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={5}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          fullWidth
          sx={{ mb: 5 }}
        />


        {oldAttachment && (
          <Box>
            <Typography variant="overline" display="block">Current Attachment</Typography>
            <img src={oldAttachment} alt="old attachment" />
          </Box>
        )}

        <FileUpload
          multiFile={true}
          disabled={false}
          title="Attachment"
          header="[Drag to drop]"
          leftLabel="or"
          rightLabel="to select files"
          buttonLabel="click here"
          maxFileSize={10}
          maxUploadFiles={0}
          maxFilesContainerHeight={357}
          errorSizeMessage={'File is too large.'}
          allowedExtensions={['jpg', 'jpeg', 'png', 'pdf']}
          onFilesChange={handleFilesChange}
          onError={handleFileUploadError}
          imageSrc={'/logo192.png'}
          bannerProps={{ elevation: 0, variant: "outlined", sx: {background: '#005662'} }}
          containerProps={{ elevation: 0, variant: "outlined" }}
        />

        <PrevNextButtons handleBack={() => {
          saveData()
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }} isActive={true} text="Save" />
      </form>
    </Box>
  );
}