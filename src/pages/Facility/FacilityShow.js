import React, {useState, useEffect} from "react";
import { Container, Stack, Grid } from "@mui/material";
import ShowModal from 'components/Modal/ShowModal'
import ItemDetail from "components/Modal/ItemDetail";
import Page from 'material-ui-shell/lib/containers/Page';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import {
  getFacilityDetails,
  clearErrors,
} from "actions/facilityActions"
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import MainAppBar from 'components/MainAppBar'
import { CardActionArea } from '@mui/material';

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
      appBarContent={<MainAppBar title="Facility Details" />} 
    >
      {loading || !facility.id ? (
        <Container maxWidth="lg" sx={{ mx: "auto"}}>
          <Stack spacing={2}>
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
            <Skeleton animation="wave" height={100} />
          </Stack>
        </Container>
      ): (
        <Container maxWidth="md" sx={{ mx: "auto", mt: '2rem'}}>
          {facility.cover && (
            <div className="image-cover">
              <img src={facility.cover}  alt={facility.name} />
              <p className="title">{facility.name}</p>
              <div className="code">
                <Typography color="primary" variant="overline">Code:</Typography>
                <Typography color="primary" variant="body1">{facility.code}</Typography>
              </div>
            </div>        
          )}
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
                <Grid container sx={{width: '100%', mt: "1rem"}} spacing={{ xs:2, sm:3, md:4}} >
                  {facility.schedules.map(schedule => (
                    <Grid item xs={12} sm={12} md={3} lg={4} sx={{mt: "1rem"}}>
                      <Card sx={{ height: '100%' }} >
                        <CardActionArea onClick={() => navigate(`/schedule/${schedule.id}`)}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {titleCase(schedule.type)}
                            </Typography>
                            <Typography variant="body1" component="div">
                              {schedule.title}
                            </Typography>
                            <Typography sx={{ mt: 1.5, mb: 1.5, fontSize: 12 }} color="text.secondary">
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
                        </CardActionArea>
                      </Card>  
                    </Grid>        
                  ))}            
                </Grid>            
              </Box>
            ): (
               <Typography color="primary" variant="caption">No Schedule for this Facility...</Typography>
            )}
        </Container>
      )}
    </Page>
  )
}

export default FacilityShow;