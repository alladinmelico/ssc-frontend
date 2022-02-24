import { Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, {useState} from 'react'
import { useIntl } from 'react-intl'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
import Paper from '@mui/material/Paper';
import Main from 'components/Map/Main';
import DashboardTime from './DashboardTime';
import {
  GroupsOutlined
} from '@mui/icons-material'

const HomePage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(1)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })} >
      <Box sx={{ p: '1rem' }}>
        <Grid container spacing={4} sx={{ height: '100%',  width: '100%' }}>
          <Grid item xs={6}>
            <DashboardTime />
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <DashboardCard number={250} title="Present Students" icon={<GroupsOutlined />} />
                <DashboardCard number={250} title="Present Students" />
              </Grid>
              <Grid item xs={6}>
                <DashboardCard number={30} title="Number of Schedule Students" />
                <DashboardCard number={66} title="PNumber of Schedules" />
                <DashboardCard number={37} title="Present Students" />
              </Grid>
            </Grid>    
          </Grid>
          <Grid item xs={6}>
            <Main selected={selected} setSelected={setSelected} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} showDetails />
          </Grid>
        </Grid>
      </Box>     
    </Page>
  )
}
export default HomePage
