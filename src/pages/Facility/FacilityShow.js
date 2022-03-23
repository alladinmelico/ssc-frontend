import React, {useState, useEffect} from "react";
import ShowModal from 'components/Modal/ShowModal'
import { Grid, Stack } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Container from '@mui/material/Container';
import Page from 'material-ui-shell/lib/containers/Page';
import {
  getFacilityDetails,
  clearErrors,
} from "actions/facilityActions"
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import MainAppBar from 'components/MainAppBar'

const FacilityShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const { loading, facility } = useSelector((state) => state.facilityDetails)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      dispatch(getFacilityDetails(id))
    }
  }, [id])

  function titleCase(string) {
    const sentence = string.toLowerCase().split("_");
    for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1) + " ";
    }
    return sentence;
   }

  return (
    <Page
      appBarContent={<MainAppBar title="Facility Details" to="/facility/create" />}
    >
      {loading || !facility.id ? (
        <Container maxWidth="md" sx={{ mx: "auto"}}>
          <Stack spacing={2}>
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
          </Stack>
        </Container>
      ): (
        <Container maxWidth="md" sx={{ mx: "auto", mt: '2rem'}}>
          <Stack spacing={2}>
            <ItemDetail label="Name" value={facility.name} />
            <ItemDetail label="Code" value={facility.code} />
            <ItemDetail label="Capacity" value={facility.capacity} />
            <ItemDetail label="Type" value={facility.type} />
            <ItemDetail label="Building" value={facility.building} />
          </Stack>
            {facility.schedules ? (            
              <Box sx={{ my: '2rem' }}>
                <Typography color="primary" variant="h5">Schedules: </Typography>
                <Grid container rowSpacing={3} spacing={2}>
                  {facility.schedules.map(schedule => (
                    <Grid item xs={4}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {titleCase(schedule.type)}
                          </Typography>
                          <Typography variant="body1" component="div">
                            {schedule.title}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>Start Time:</strong> {schedule.start_at}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>End Time:</strong> {schedule.end_at}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>Start Date:</strong> {schedule.start_date}
                          </Typography>
                          {schedule.start_date && (
                            <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                              <strong>Start Time:</strong> {schedule.start_date}
                            </Typography>                  
                          )}
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={() => navigate(`/schedule/${schedule.id}`)}>Learn More</Button>
                        </CardActions>
                      </Card>  
                    </Grid>          
                  ))}            
                </Grid>            
              </Box>
            ): (
               <Typography color="primary" variant="caption">No schedule for this facility...</Typography>
            )}
        </Container>
      )}
    </Page>
  )
}

export default FacilityShow;