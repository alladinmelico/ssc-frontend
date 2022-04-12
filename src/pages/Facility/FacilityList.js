import React, { useEffect, useState } from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import MainAppBar from 'components/MainAppBar';
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminFacilities
} from "actions/facilityActions";
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const FacilityList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const { loading, facilities, count, currentPage, lastPage, error } = useSelector((state) => state.facilities);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminFacilities(page, rowsPerPage));
    }
    if (total === 0) {
      setTotal(lastPage);
    }
  }, [dispatch, page, rowsPerPage, page, error]);
  return (
    <Page pageTitle="Facilities">
      <Container sx={{ pt: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }} >
        <Grid container sx={{ flexGrow: 1 }} spacing={{ xs:2, sm:3, md:3}} justifyContent="center" alignItems="stretch">
          {facilities.map(facility => (
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ pb: "1rem" }}>
                <Card sx={{ maxWidth: 300, height: "100%", mx:"auto" }}>
                  <CardActionArea sx={{ height: "100%"}}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'  }}
                    onClick={() => navigate(`/facility/${facility.id}`)}>
                    {facility.cover && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={facility.cover}
                        alt={facility.name}
                        loading="lazy"
                      />                
                    )}
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {facility.code}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }} component="div" color="primary">
                        {facility.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>               
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mx: 'auto', p: '1rem', mb: '2rem' }}>
          <Pagination
            onChange={(e, page) => setPage(page - 1)}
            count={lastPage}
            variant="outlined"
            shape="rounded"
            sx={{ mx: 'auto', width: '100%' }}
          />
        </Box>
      </Container>

    </Page>

  );
};

export default FacilityList;