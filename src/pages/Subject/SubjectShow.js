import React, {useState, useEffect} from "react";
import { Container, Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Page from 'material-ui-shell/lib/containers/Page';
import { useDispatch, useSelector } from "react-redux"
import {
  getSubjectDetails,
  clearErrors,
} from "actions/subjectActions"
import {useNavigate} from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import MainAppBar from 'components/MainAppBar'

const SubjectShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const { loading, subject } = useSelector((state) => state.subjectDetails)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      dispatch(getSubjectDetails(id))
    }
  }, [id])

  return (
    <Page appBarContent={<MainAppBar title="Subject Details"/>}>
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
      <Container>
        <Stack spacing={2}>
          <ItemDetail label="Name" value={subject.name} />
          <ItemDetail label="Code" value={subject.code} />
        </Stack>
      </Container>
      )}
    </Page>
  )
}

export default SubjectShow;