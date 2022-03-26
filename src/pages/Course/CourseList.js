import React, { useEffect, useState } from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import MainAppBar from 'components/MainAppBar';
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminCourses
} from "actions/courseActions";
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const CourseList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const { loading, courses, count, currentPage, lastPage, error } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminCourses(page, rowsPerPage));
    }
    if (total === 0) {
      setTotal(lastPage);
    }
  }, [dispatch, page, rowsPerPage, page, error]);
  return (
    <Page pageTitle="Courses">
      <Container sx={{ pt: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }} >
        <Grid container spacing={2} sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
          {courses.map(course => (
            <Grid item xs={6} sm={4} md={6} lg={3} sx={{ px: "1rem", pb: "1rem" }}>
              <Card sx={{ minWidth: 275 }}>                               
                {course.cover && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.cover?.urls.small}
                    alt={course.cover?.alt_description}
                    loading="lazy"
                  />                
                )}
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {course.code}
                  </Typography>
                  <Typography variant="h5" component="div" color="primary">
                    {course.name}
                  </Typography>
                  <Typography variant="body" component="div" sx={{ my: '1rem' }}>
                    {course.users_count} users
                  </Typography>
                  <Typography variant="overline">
                    {course.department}
                  </Typography>
                </CardContent>
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

export default CourseList;