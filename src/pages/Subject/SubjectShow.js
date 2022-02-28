import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const SubjectShow = ({modalClosed, subject}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (subject && subject.id) {
      setOpenModal(true)
    }
  }, [subject])

  return (
    <ShowModal
      title="Subject Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={subject.name} />
        <ItemDetail label="Code" value={subject.code} />
      </Stack>
    </ShowModal>
  )
}

export default SubjectShow;