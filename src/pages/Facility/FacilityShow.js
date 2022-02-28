import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const FacilityShow = ({modalClosed, facility}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (facility && facility.id) {
      setOpenModal(true)
    }
  }, [facility])

  return (
    <ShowModal
      title="Facility Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={facility.name} />
        <ItemDetail label="Code" value={facility.code} />
        <ItemDetail label="Capacity" value={facility.capacity} />
        <ItemDetail label="Type" value={facility.type} />
        <ItemDetail label="Building" value={facility.building} />
      </Stack>
    </ShowModal>
  )
}

export default FacilityShow;