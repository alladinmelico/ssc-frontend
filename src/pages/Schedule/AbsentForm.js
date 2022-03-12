import API from '../../config/api'
import React, { useState, useEffect } from 'react'
import FormModal from '../../components/Modal/FormModal'
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FileUpload from "react-mui-fileuploader"

export default function AbsentForm ({batch, successfullySent, openModal, setOpenModal, modalClosed}) {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [note, setNote] = useState('')
  const [attachment, setAttachment] = useState('')
  const { enqueueSnackbar } = useSnackbar()

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

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData()
    formData.append('note', note)
    formData.append('attachment', attachment)
    await API.post(`batch/${batch}/leaveApplication`, formData)
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar('Absent request successfully sent.', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
          successfullySent(true)
        }
      })
      .catch(err => {
        enqueueSnackbar('Sending Absent request failed.', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      })
      .finally(() => {
        clearValues()
      })
  };

  function clearValues () {
    setLoading(false)
    setOpenModal(false)
    setNote('')
    setAttachment('')
    modalClosed()
  }

  return (
    <div>
      <FormModal
        title="Submit a Report to Admin"
        onSubmit={onSubmit}
        openModal={openModal}
        loading={loading}
        success={success}
        setOpenModal={setOpenModal}
        noFab={true}
        cancelled={() => {
          clearValues()
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={5}
          value={note}
          required
          onChange={(event) => setNote(event.target.value)}
          fullWidth
          margin='normal'
        />
        <FileUpload
          multiFile={false}
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
          imageSrc={'/logo-dark.png'}
          bannerProps={{ elevation: 0, variant: "outlined", sx: {background: '#005662'} }}
          containerProps={{ elevation: 0, variant: "outlined" }}
        />
      </FormModal>
    </div>
  );
}