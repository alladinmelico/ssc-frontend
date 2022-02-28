import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const UserShow = ({modalClosed, user}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (user && user.id) {
      setOpenModal(true)
    }
  }, [user])

  return (
    <ShowModal
      title="User Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={user.name} />
        <ItemDetail label="Email" value={user.email} />
        <ItemDetail label="Year" value={user.year} />
        <ItemDetail label="Section" value={user.section} />
        <ItemDetail label="School ID" value={user.school_id} />
        <ItemDetail label="Role" value={user.role} />
        <ItemDetail label="Course" value={user.course_name} />
        <ItemDetail label="Status" value={user.changes_verified} />
      </Stack>
    </ShowModal>
  )
}

export default UserShow;