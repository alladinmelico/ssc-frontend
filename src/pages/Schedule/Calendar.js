import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridWeek from '@fullcalendar/timegrid' 
import Page from 'material-ui-shell/lib/containers/Page';
import MainAppBar from 'components/MainAppBar'
import {
  getAdminSchedules
} from "actions/scheduleActions"
import { useDispatch, useSelector } from "react-redux"
import dayjs from 'dayjs';
import { Container } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Calendar = () => {
  const dispatch = useDispatch()
  const { loading, schedules, count, error } = useSelector((state) => state.schedules)
  const navigate = useNavigate();
  function getDaysOfWeek(daysOfWeek, num = false) {
    if (num) {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const selectedDays = []
      if (typeof daysOfWeek === 'object' && daysOfWeek !== null) {
        daysOfWeek.forEach(day => {
          selectedDays.push(days.indexOf(day) + "") 
        });
      } 
      return selectedDays
    }
    let convertedDays = [] 
    if (typeof daysOfWeek === 'object') {
      daysOfWeek.forEach(day => {
        convertedDays.push(day.toLowerString().substring(0, 2))
      });
      return convertedDays
    }
    return []
  }

  useEffect(() => {
    if (!loading) {
      dispatch(getAdminSchedules(0, 10))
    }
  }, [dispatch])

  function getRule (sched) {
    const data = {}
    data.dtstart = sched.start_date
    data.until = sched.end_date

    if (sched.is_recurring && sched.repeat_by) {
      data.freq = sched.repeat_by
      if (sched.repeat_by === 'weekly') {
        if (sched.days_of_week === null) {
          data.byweekday = ['mo']
        } else {
          data.byweekday = getDaysOfWeek(sched.days_of_week)        
        }
      }
      if (sched.repeat_by === 'monthly') {
        data.bymonth = range(dayjs(sched.start_date).month(),dayjs(sched.end_date).month(), 1)
      }
    } else {
      data.freq = 'daily'
    }
    return data
  }

  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

  return (
    <Page appBarContent={<MainAppBar title="Schedule Calendar" to="/schedule/create" />}>
      <Container sx={{ my: '1rem' }}>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridWeek ]}
          weekends={false}
          headerToolbar={{
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            right: 'prevYear,prev,next,nextYear'
          }}
          footerToolbar= {{
            left: 'max10,max50,max100',
            center: '',
            right: 'prev,next'
          }}
          dayMaxEvents={true}
          themeSystem="Lumen"
          eventClick={(event) => navigate(`/schedule/${event.event.id}`)}
          customButtons={{
            max10: {
              text: 'Limit by 10',
              click: function() {
                dispatch(getAdminSchedules(0, 10))
              }
            },
            max50: {
              text: 'Limit by 50',
              click: function() {
                dispatch(getAdminSchedules(0, 50))
              }
            },
            max100: {
              text: 'Limit by 100',
              click: function() {
                dispatch(getAdminSchedules(0, 100))
              }
            }
          }}
          events={schedules.map(schedule => {
            const data = {
              id: schedule.id,
              title: schedule.title,
              groupId: schedule.id,
              allDay: false,           
              startTime: schedule.start_at,
              endTime: schedule.end_at,
              editable: false,
            }
            if (schedule.is_recurring) {
              // data.rrule = getRule(schedule)
              data.daysOfWeek = getDaysOfWeek(schedule.days_of_week, true)
              data.startRecur = schedule.start_date
              data.endRecur = schedule.end_date
            } else {
              data.start = schedule.start_date
              data.end = schedule.end_date
            }
            return data;
          })}
          initialView="dayGridMonth"
        />
      </Container>
    </Page>
  )
}

export default Calendar