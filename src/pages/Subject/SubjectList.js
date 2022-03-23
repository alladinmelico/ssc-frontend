import React, {useEffect, useState} from 'react'
import Page from 'material-ui-shell/lib/containers/Page';
import MainAppBar from 'components/MainAppBar'
import { useDispatch, useSelector } from "react-redux"
import {
    getAdminSubjects
  } from "actions/subjectActions"
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import {useNavigate} from 'react-router-dom';

const SubjectList = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0)
    const { loading, subjects, count, currentPage, lastPage, error } = useSelector((state) => state.subjects)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
          dispatch(getAdminSubjects(page, rowsPerPage))
        }
        if (total === 0) {
            setTotal(lastPage)
        }
      }, [dispatch,page, rowsPerPage, page, error])
    return (
        <Page pageTitle="Subjects">
            <Container sx={{pt: '1rem', display: 'flex', flexDirection: 'column', height: '100%'}} >
                <Grid container spacing={2} sx={{flexGrow: 1}}>
                    {subjects.map(subject => (
                        <Grid item xs={6} sm={4} md={6} lg={3} sx={{px:"1rem", pb:"1rem"}}>
                             <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {subject.code}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                    {subject.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => navigate(`/subject/${subject.id}`)} size="small">View Details</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box>
                    <Pagination
                        onChange={(e, page) => setPage(page-1)}
                        count={lastPage}
                        variant="outlined"
                        shape="rounded"
                        sx={{mx: 'auto', width: '100%'}}
                    />
                </Box>
            </Container>

        </Page>

    )
}

export default SubjectList