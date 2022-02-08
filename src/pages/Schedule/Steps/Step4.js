import React, { useEffect, useState  } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import FileUpload from "react-mui-fileuploader"
import TextField from '@mui/material/TextField';
import { NEW_SCHEDULE_REQUEST } from "../../../constants/scheduleConstants"
import PrevNextButtons from './PrevNextButtons';
import {
  newSchedule,
  clearErrors,
} from "../../../actions/scheduleActions"

export default function Step4({history, activeStep, setActiveStep}) {
  const [attachment, setAttachment] = useState({});
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
    Object.entries(schedule).map(([key, value]) => {
      if (key.includes('is_')) {
        return formData.append(key, (value ? 1 : 0))
      }
      return formData.append(key, value)
    })
    
    formData.append('attachment', attachment)
    formData.append('note', note)
    dispatch(newSchedule(formData))
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  
  const handleFileUploadError = (error) => {
    // Do something...
  }
  
  const handleFilesChange = (files) => {
    const file = files.pop()

    fetch(file.path)
    .then(res => res.blob())
    .then(blob => {
      const fileObj = new File([blob], file.name,{ type: file.contentType })
      setAttachment(fileObj)
    })
  }

  useEffect(() => {
    if (schedule) {
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
          defaultValue="Notes..."
          fullWidth
          sx={{ mb: 5 }}
        />

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
          errorSizeMessage={'fill it or move it to use the default error message'}
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