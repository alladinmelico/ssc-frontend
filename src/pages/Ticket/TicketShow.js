import React, {useState, useEffect} from "react";
import { Container, Stack, Grid } from "@mui/material";
import ItemDetail from "components/Modal/ItemDetail";
import Page from 'material-ui-shell/lib/containers/Page';
import { useDispatch, useSelector } from "react-redux"
import {
  getTicketDetails,
  clearErrors,
} from "actions/ticketActions"
import {useNavigate} from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import MainAppBar from 'components/MainAppBar'
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const TicketShow = () => {
  const loc = window.location.pathname
  const id = loc.substring(loc.lastIndexOf('/') + 1);
  const { loading, ticket } = useSelector((state) => state.ticketDetails)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      dispatch(getTicketDetails(id))
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
    <Page appBarContent={<MainAppBar title="Ticket Details"/>}>
        {loading ? (
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
        {ticket.cover && (
          <div className="image-cover">
            <img src={ticket.cover?.urls.regular}  alt={ticket.cover?.alt_description} />
            <p className="title">{ticket.name}</p>
            <div className="code">
              <Typography color="primary" variant="overline">Code:</Typography>
              <Typography color="primary" variant="body1">{ticket.code}</Typography>
            </div>
          </div>        
        )}
        {ticket.classrooms ? (            
              <Box sx={{ my: '2rem' }}>
                <Typography color="primary" variant="h5">Classrooms: </Typography>
                <Grid container sx={{width: '100%', mt: "1rem"}} spacing={{ xs:2, sm:3, md:4}} >
                  {ticket.classrooms.map(classroom => (
                    <Grid item xs={12} sm={12} md={3} lg={4} sx={{mt: "1rem"}}>
                      <Card sx={{ height: '100%' }} >
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {titleCase(classroom.description_heading)}
                          </Typography>
                          <Typography variant="body1" component="div">
                            {classroom.name}
                          </Typography>
                          <Typography sx={{ mt: 1.5, mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>Description:</strong> {classroom.description}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>Google Classroom:</strong> {classroom.google_classroom_id}
                          </Typography>
                          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            <strong>Section:</strong> {classroom.section?.name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={() => navigate(`/classroom/${classroom.id}`)}>Learn More</Button>
                        </CardActions>
                      </Card>  
                    </Grid>        
                  ))}            
                </Grid>            
              </Box>
            ): (
               <Typography color="primary" variant="caption">No Classroom for this Ticket...</Typography>
            )}
        </Container>
      )}
    </Page>
  )
}

export default TicketShow;