import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Typography from '@mui/material/Typography';

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
      <Stack sx={{mt: "1rem"}} spacing={2}>
        {course.cover && (
          <div className="image-cover">
            <img src={course.cover?.urls.regular}  alt={course.cover?.alt_description} />
            <p className="title">{course.name}</p>
            <div className="code">
              <Typography color="primary" variant="overline">Code:</Typography>
              <Typography color="primary" variant="body1">{course.code}</Typography>
            </div>
          </div>        
        )}
        <ItemDetail label="Name" value={course.name} />
        <ItemDetail label="Code" value={course.code} />
        <ItemDetail label="Department" value={course.department} />
      </Stack>
    </ShowModal>
  )
}

export default CourseShow;