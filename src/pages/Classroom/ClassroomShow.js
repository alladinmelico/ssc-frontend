import React, {useState, useEffect} from "react";
import { Container, Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Skeleton from '@mui/material/Skeleton';
import MainAppBar from 'components/MainAppBar'
import Page from "material-ui-shell/lib/containers/Page";
import { useDispatch, useSelector } from "react-redux"
import {
  getClassroomDetails,
} from "actions/classroomActions"

const ClassroomShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const { loading, classroom } = useSelector((state) => state.classroomDetails)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!loading) {
      dispatch(getClassroomDetails(id))
    }
  }, [id])

  return (
    <Page appBarContent={<MainAppBar title="Classroom Details"/>}>
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
        </Stack>
      </Container>
      )}
    </Page>
  )
}

export default ClassroomShow;