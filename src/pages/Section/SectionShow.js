import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const SectionShow = ({modalClosed, section}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (section && section.id) {
      setOpenModal(true)
    }
  }, [section])

  return (
    <ShowModal
      title="Section Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={section.name} />
        <ItemDetail label="President" value={section.president_name} />
        <ItemDetail label="Faculty" value={section.faculty_name} />
      </Stack>
    </ShowModal>
  )
}

export default SectionShow;