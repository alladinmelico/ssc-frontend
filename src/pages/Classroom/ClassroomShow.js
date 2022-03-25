import React, {useState, useEffect} from "react";
import { Button, Container,Stack} from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Skeleton from '@mui/material/Skeleton';
import MainAppBar from 'components/MainAppBar'
import Page from "material-ui-shell/lib/containers/Page";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import {
  getClassroomDetails,
} from "actions/classroomActions"
import SectionShow from "pages/Section/SectionShow";
import {useNavigate} from 'react-router-dom';

const style = {
  justifyContent: "flex-start",
  maxHeight: '30px',
  fontSize: '14px', 
  bgcolor: 'background.paper',
  '&:hover': {
    backgroundColor: 'background.paper',
    boxShadow: 'none',
  },
};

const ClassroomShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const { loading, classroom } = useSelector((state) => state.classroomDetails)
  const [viewModal, setViewModal] = useState(false)
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  useEffect(() => {
    if (!loading) {
      dispatch(getClassroomDetails(id))
    }
  }, [id])
  console.log(classroom.section)

  return (
    <Page 
    appBarContent={
      <MainAppBar 
        title="Classroom Details"
    />
    }
    >
        {loading ? (
        <Container maxWidth="md" sx={{ mx: "auto"}}>
          <Stack spacing={2}>
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
          </Stack>
        </Container>
      ): (
      <Container maxWidth="md" sx={{mx:"auto", mt:'2rem'}}>
        <Stack spacing={2}>
        <ItemDetail label="Name" value={classroom.name} />
        <ItemDetail label="Description Heading" value={classroom.description_heading} />
        <ItemDetail label="Description" value={classroom.description} />

        <ItemDetail label="Section" />
          <Button sx={style} onClick={() => {
            setViewModal(true)}}>
            {classroom.section?.name}</Button>
            {viewModal && <SectionShow section={classroom.section} modalClosed={() => {setViewModal(false) }}/>}

        <ItemDetail label="Subject" />
          <Button sx={style} onClick={() => navigate(`/subject/${classroom.subject_id}`)}>{classroom.subject?.name}</Button>
        <ItemDetail label="Total Users" value={classroom.users?.length} /> 
        <ItemDetail label="Total Schedules" value={classroom.schedules?.length}/> 
        </Stack>
      </Container>
      )}
    </Page>
  )
}

export default ClassroomShow;