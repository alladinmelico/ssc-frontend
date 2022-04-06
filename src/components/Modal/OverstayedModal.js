import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Button, Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const OverstayedModal = ({modalClosed, user}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    
    if (user !== null) {
      setOpenModal(true)
      console.log(user)
    }
  }, [user])

  return (
    <div>
    <ShowModal
      title="Overstayed Users"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
      >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={user.name} />
      </Stack>
    </ShowModal>
      </div>
  )
}

export default OverstayedModal;