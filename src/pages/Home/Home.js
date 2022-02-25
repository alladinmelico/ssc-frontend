import { Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, {useState, useEffect} from 'react'
import { useIntl } from 'react-intl'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
import Paper from '@mui/material/Paper';
import Main from 'components/Map/Main';
import DashboardTime from './DashboardTime';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import Echo from 'laravel-echo'
import API from 'config/api';
import { useSnackbar } from 'notistack'

const HomePage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(1)
  const [schedulesCount, setSchedulesCount] = useState(0)
  const [schedules, setSchedules] = useState([])
  const [presentUsers, setPresentUsers] = useState(0)
  const [schedulesNow, setSchedulesNow] = useState([])
  const [schedulesOverStay, setSchedulesOverStay] = useState([])
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar()

  const getDashboardData = async () => {
    setLoading(true)
    await API.get(`dashboard`).then(res => {
      setPresentUsers(res.data.present_students)
      setSchedules(res.data.schedules_today)
      setSchedulesCount(res.data.schedules_today.length)
      setSchedulesNow(res.data.schedules_now)
      setSchedulesOverStay(res.data.schedules_overstay)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (schedulesCount === 0 && !loading) {
      getDashboardData()
      const echo = new Echo({
          broadcaster: 'pusher',
          key: '6abdea39720f6b0b8824',
          cluster: 'ap1',
        })

      echo.channel('logging').listen('UserLogging', (e) => {
        enqueueSnackbar(`${e.rfid.user.name} logged ${e.rfid.is_logged ? 'in' : 'out'}.`, {variant: 'success'})  
        console.log(e)
        if (e.rfid.is_logged) {
          setPresentUsers(prevCount => prevCount + 1)
        } else {
          setPresentUsers(prevCount => prevCount - 1)
        }
      })
    }
  }, [schedulesCount, loading]);

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })} >
      <Box sx={{ p: '1rem' }}>
        <Grid container spacing={4} sx={{ height: '100%',  width: '100%' }}>
          <Grid item xs={12} md={6}>
            <DashboardTime />
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <DashboardCard 
                  number={presentUsers}
                  title="Users inside the campus"
                  backgroundColor="#d7ffd9"
                  borderColor="#81c784"
                  icon={<GroupOutlinedIcon sx={{ color: "#338a3e"  }} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DashboardCard
                  number={schedules.length}
                  backgroundColor="#e6ffff"
                  borderColor="#4ba3c7"
                  title="Number of Schedules Today"
                  icon={<CalendarTodayOutlinedIcon sx={{ color: "#4ba3c7"  }} />}
                />
                <DashboardCard
                  number={schedulesNow.length}
                  backgroundColor="#e6ffff"
                  borderColor="#4ba3c7"
                  title="Number of Schedules Now"
                  icon={<EventAvailableOutlinedIcon sx={{ color: "#4ba3c7"  }} />}
                />
                <DashboardCard
                  number={schedulesOverStay.length}
                  backgroundColor="#ffffb3"
                  borderColor="#caae53"
                  title="Total Overstayed Users"
                  icon={<WarningAmberOutlinedIcon sx={{ color: "#caae53"  }} />}
                />
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
