import Page from 'material-ui-shell/lib/containers/Page'
import React, {useState, useEffect} from 'react'
import { useIntl } from 'react-intl'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DashboardCard from './DashboardCard';
import Main from 'components/Map/Main';
import DashboardTime from './DashboardTime';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import API from 'config/api';
import { useSnackbar } from 'notistack'
import Avatar from '@mui/material/Avatar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ScheduleChart from './ScheduleChart';
import FacilityChart from './FacilityChart';
import { useAuth } from 'base-shell/lib/providers/Auth'
import OverstayedModal from 'components/Modal/OverstayedModal';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const HomePage = () => {
  const intl = useIntl()
  const [selected, setSelected] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(1)
  const [schedulesCount, setSchedulesCount] = useState(0)
  const [temperatures, setTemperatures] = useState([])
  const [schedules, setSchedules] = useState([])
  const [presentUsers, setPresentUsers] = useState([])
  const [schedulesNow, setSchedulesNow] = useState([])
  const [schedulesOverStay, setSchedulesOverStay] = useState([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const [listenerInit, setListenerInit] = useState(false);

  const { auth } = useAuth()

  const [viewModal, setViewModal] = useState(false)
  const [data, setData] = useState({})

  const overUser = () => {
    setData(schedulesOverStay);
  }

  const { enqueueSnackbar } = useSnackbar()

  const getTemperaturesData = async () => {
    await API.get(`temperature?page=1&limit=5`).then(res => {
      setTemperatures(res.data.data)
    }).catch(err => {
    })
  }

  const getDashboardData = async () => {
    setLoading(true)
    try {
      await API.get(`dashboard`).then(res => {
        setPresentUsers(res.data.present_students)
        setSchedules(res.data.schedules_today)
        setSchedulesCount(res.data.schedules_today.length)
        setSchedulesNow(res.data.schedules_now)
        setSchedulesOverStay(res.data.schedules_overstay)
        setLoading(false)
        setSuccess(true)
      }).catch(error => {
      })
    } catch (error) {
      console.log('err', error)
    }
    
  }

  useEffect(() => {
    if (!API.defaults.headers.Authorization.includes(auth.token)) {
      window.location.reload()
    }
    if (!success && auth.token) {
      getDashboardData()
      getTemperaturesData()
      if (!listenerInit) {
        window.echo.channel('logging').listen('UserLogging', (e) => {
          if (presentUsers) {
            if (presentUsers.find(item => item.id === e.rfid.user.id) && !e.rfid.is_logged) {
              setPresentUsers(presentUsers.filter(item => item.id != e.rfid.user.id))
              enqueueSnackbar(`${e.rfid.user.name} logged out.`, {variant: 'success'})  
            } else if (!presentUsers.find(item => item.id === e.rfid.user.id) && e.rfid.is_logged) {
              setPresentUsers([...presentUsers, e.rfid.user])
              enqueueSnackbar(`${e.rfid.user.name} logged in.`, {variant: 'success'})  
            }
          }
        })
        window.echo.channel('temperature').listen('UserTemperature', (e) => {
            console.log(temperatures, e.temperature)
          if (auth.id === e.temperature.user_id || auth.role === 1) {
              enqueueSnackbar(`${e.temperature.user.name} recorded ${e.temperature.temperature}.`, {variant: 'info'}) 
          }
          setTemperatures(prev => [e.temperature, ...prev.slice(0, -1)])
        })
        setListenerInit(true)
      }
    }
  }, [schedulesCount, success]);

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })} >
      <Box sx={{ p: '1rem' }}>
        <Grid container sx={{ mx:"auto", height: '100%',  width: '100%' }}>
          <Grid item xs={12} md={6}>
            <DashboardTime />
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={6}>
                <DashboardCard 
                  number={presentUsers.length}
                  title="Users inside the campus"
                  backgroundColor="#d7ffd9"
                  borderColor="#81c784"
                  icon={<GroupOutlinedIcon sx={{ color: "#338a3e"  }} />}
                />
                <Box sx={{ m: '1rem' }}>
                  <Card variant="outlined">
                    <CardContent>
                      <DeviceThermostatOutlinedIcon sx={{ color: "#338a3e"  }} />
                      <List>
                        {temperatures.map(temp => (
                          <ListItem key={temp.id}>
                            <ListItemAvatar>
                              {temp.user?.avatar ? (
                                <Avatar alt={temp.user?.name} src={temp.user?.avatar} />
                              ) : (
                                <Avatar>
                                  <PersonOutlineOutlinedIcon />
                                </Avatar>
                              )}
                            </ListItemAvatar>
                            <ListItemText primary={temp.temperature} secondary={temp.user.name} />
                          </ListItem>                        
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <DashboardCard
                  number={schedulesOverStay.length}
                  backgroundColor="#ffffb3"
                  borderColor="#caae53"
                  title="Total Overstayed Users"
                  icon={
                    <WarningAmberOutlinedIcon
                      sx={{ color: "#caae53"  }}
                    />}
                  actions={
                    <CardActions>
                      {auth.role === 1 && (
                        <Button size="small"
                          onClick={() => {
                          overUser()
                          setViewModal(true)}}>
                          View List
                        </Button>
                      )}
                    </CardActions>
                  }
                  />
                  {viewModal && <OverstayedModal schedules_overstay={schedulesOverStay} modalClosed={() => {setViewModal(false) }}/>}

                <ScheduleChart schedules={schedules} schedulesNow={schedulesNow} />
              </Grid>
            </Grid>    
          </Grid>
          <Grid item xs={12} md={12} lg={6} sx={{pb:"1rem"}}>
            <Main selected={selected} setSelected={setSelected} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} showDetails />
          </Grid>
        </Grid>
        <FacilityChart  />
      </Box>     
    </Page>
  )
}
export default HomePage
