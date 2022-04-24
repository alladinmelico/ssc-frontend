import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridWeek from '@fullcalendar/timegrid' 
import {
  getAdminSchedules
} from "actions/scheduleActions"
import { useDispatch, useSelector } from "react-redux"
import dayjs from 'dayjs';
import { Container } from '@mui/material';
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from "@fullcalendar/interaction";

const ScheduleCalendar = ({schedules, schedule, startDate, endDate, isRecurring, setSelected, hasButtons=true}) => {
  const dispatch = useDispatch()
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
        convertedDays.push(day.toLowerCase().substring(0, 2))
      });
      return convertedDays
    }
    return []
  }

  function getRule (sched) {
    const data = {}
    data.dtstart = new Date(sched.start_date + 'T' + sched.start_at)
    data.until = new Date(sched.end_date + 'T' + sched.end_at)

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
  let addedSchedule = [...schedules]
  if (schedule) {
    schedule.current = true
    addedSchedule = [...schedules, schedule]
  }

  return (
    <Container sx={{ my: '1rem' }}>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridWeek, rrulePlugin, interactionPlugin ]}
        weekends={true}
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'prevYear,prev,next,nextYear'
        }}
        footerToolbar= {{
          center: '',
          right: 'prev,next'
        }}
        selectable={true}
        dayMaxEvents={true}
        dateClick={setSelected}
        events={addedSchedule.map(schedule => {
          const data = {
            id: schedule.id,
            allDay: false,           
            editable: false,
            start: new Date(schedule.start_date + 'T' + schedule.start_at),
            end: new Date(schedule.start_date + 'T' + schedule.end_at),
          }
          if (schedule.is_recurring) {
            data.rrule = getRule(schedule)
          }
          if (schedule.current) {
            if (!schedule.start) {
              data.start = new Date(startDate.format())
              if (isRecurring) {
                data.end = new Date(endDate.format())
              } else {
                data.end = new Date(startDate.format())
              }
            }
            data.display = 'background'
            data.color = '#00838f'
            data.backgroundColor = '#00838f'
            data.allDay = true
            data.title = schedule.title
          }
          return data;
        })}
        initialView="dayGridMonth"
      />
    </Container>
  )
}

export default ScheduleCalendar