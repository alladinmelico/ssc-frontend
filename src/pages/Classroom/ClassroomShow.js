import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const ClassroomShow = ({modalClosed, classroom}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (classroom && classroom.id) {
      setOpenModal(true)
    }
  }, [classroom])

  return (
    <ShowModal
      title="Classroom Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={classroom.name} />
        <ItemDetail label="Description Heading" value={classroom.description_heading} />
        <ItemDetail label="Description" value={classroom.description} />
        <ItemDetail label="Google Classroom ID" value={classroom.description} />
      </Stack>
    </ShowModal>
  )
}

export default ClassroomShow;