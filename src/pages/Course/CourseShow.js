import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";

const CourseShow = ({modalClosed, course}) => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (course && course.id) {
      setOpenModal(true)
    }
  }, [course])

  return (
    <ShowModal
      title="Course Details"
      openModal={openModal}
      setOpenModal={setOpenModal}
      cancelled={modalClosed}
    >
      <Stack spacing={2}>
        <ItemDetail label="Name" value={course.name} />
        <ItemDetail label="Code" value={course.code} />
        <ItemDetail label="Department" value={course.department} />
      </Stack>
    </ShowModal>
  )
}

export default CourseShow;