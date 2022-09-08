import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CLEAR_DATA } from 'constants/scheduleConstants';
import ScheduleQR from '../ScheduleQR'

export default function Step5({history}) {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const componentRef =  React.createRef();
  const { schedule } = useSelector((state) => state.newSchedule)
  const { isUpdated } = useSelector((state) => state.schedule)


  useEffect(() => {
    if ((schedule && schedule.id) || isUpdated) {
      setUrl(`https://phplaravel-832205-2864431.cloudwaysapps.com/schedule/${schedule && schedule.id ? schedule.id : isUpdated.id}`)
    }
  }, [dispatch, history, schedule, isUpdated])

  return (
    <Box sx={{ minWidth: 120 }}>
      {url ? (
        <ScheduleQR url={url} schedule={schedule} isUpdated={isUpdated} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <Box>
            <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </Box>
          <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
        </Box>
      )}

    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 3 }}>
      <Button color="primary" variant="contained" onClick={() => {
        dispatch({ type: CLEAR_DATA })
        navigate('/schedule')
      }}>Done</Button>
    </Box>
    </Box>
  );
}