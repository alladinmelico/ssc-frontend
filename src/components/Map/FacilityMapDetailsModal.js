import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Button, Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import {useNavigate} from 'react-router-dom';

const FacilityMapDetailsModal = ({modalClosed, facility}) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    
    if (facility !== null) {
      setOpenModal(true)
      console.log(facility)
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
        <Button onClick={() => navigate(`/facility/${facility.id}`)}>View Details</Button>
      </Stack>
    </ShowModal>
  )
}

export default FacilityMapDetailsModal;