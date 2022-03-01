import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const  RfidShow = ({modalClosed, rfid}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (rfid && rfid.id) {
      setOpenModal(true)
      console.log(rfid)
    }
  }, [rfid])

  return (
    <ShowModal
      title="Rfid Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack sx={{mt:"8px"}} spacing={2}>
        <ItemDetail label="Name" value={rfid.user?.name} />
        <ItemDetail label="School ID" value={rfid.user?.school_id} />
        <ItemDetail label="Email" value={rfid.user?.email} />
        <ItemDetail label="Value" value={rfid.value} />
        <ItemDetail label="Logged" value={rfid.is_logged} />
      </Stack>
    </ShowModal>
  )
}

export default RfidShow;