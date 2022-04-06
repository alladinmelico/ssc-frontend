import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Button, List, Stack, ListItemText, ListSubheader } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const OverstayedModal = ({modalClosed, schedules_overstay}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    
    if (schedules_overstay.length !== 0) {
      setOpenModal(true)
    }
  }, [schedules_overstay])

  return (
    <div>
    <ShowModal
      title="Overstayed Users"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
      >
        <Stack spacing={2}>
        <ItemDetail label="Name" />
      </Stack>
        <List>
          {schedules_overstay.map(sched=> (
          <ListItemText primary={sched.name} />))}
          </List>
    </ShowModal>
      </div>
  )
}

export default OverstayedModal;