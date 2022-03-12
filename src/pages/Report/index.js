import React, { useEffect, useState } from 'react';
import Page from 'material-ui-shell/lib/containers/Page';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import API from '../../config/api'
import axios from 'axios';
const dayjs = require('dayjs')

const Report = () => {
  const [year, setYear] = useState('');
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(startDate.add(1, 'year'));
  const baseURL = 'https://safe-and-smart-campus.herokuapp.com'

  return (
    <Page
      pageTitle="Generate Reports"
    >
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Container sx={{ mt: "2rem" }}>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <MobileDatePicker
              label="Start Date"
              inputFormat="MM/D/YYYY"
              maxDate={endDate}
              value={startDate}
              onChange={(val) => setStartDate(val)}
              renderInput={(params) => <TextField required fullWidth {...params} />}
              required
            />

            <MobileDatePicker
              label="End Date"
              inputFormat="MM/D/YYYY"
              minDate={startDate}
              value={endDate}
              onChange={(val) => setEndDate(val)}
              renderInput={(params) => <TextField required fullWidth {...params} />}
              required
            />
          </Stack>
        </Container>
      </LocalizationProvider>
      <Container sx={{ mt: "2rem" }}>
        <Stack
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Box sx={{ p: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5">
                Schedules Report
              </Typography>
              <Typography sx={{mt: "1rem"}} variant="caption">
                Retrieve schedule data such as average users per schedule, total schedules for each day of the week, <br></br>
                and insightful breakdown of each Schedule.
              </Typography>
            </Box>
            <a
              href={`${baseURL}/report/schedule?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`}
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="contained" endIcon={<DownloadOutlined />}>Generate</Button>
            </a>
          </Box>
          <Box sx={{ p: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection:'column' }}>
              <Typography variant="h5">
                Users Report
              </Typography>
              <Typography sx={{mt: "1rem"}} variant="caption">
                Retrieve user data such as average absenteeism percentage, average schedules per student, <br></br>
                and absenteeism data of each User.
              </Typography>
              <FormControl required sx={{ my: 2 }}>
                <InputLabel id="type-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={year}
                  label="Year"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <MenuItem value={''}>All</MenuItem>
                  {[1,2,3,4,5].map((item, index) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <a
              href={`${baseURL}/report/user?year=${year}`}
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="contained" endIcon={<DownloadOutlined />}>Generate</Button>
            </a>
          </Box>
          <Box sx={{ p: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5">
                Temperatures Report
              </Typography>
              <Typography sx={{mt: "1rem"}} variant="caption">
                Retrieve temperature data such as average value of scanned temperatures,<br></br>
                total number of users who have temperature of 38°C or higher,<br></br>
                and list of scanned temperatures within selected date range.
              </Typography>
            </Box>
            <a
              href={`${baseURL}/report/temperature?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`}
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="contained" endIcon={<DownloadOutlined />}>Generate</Button>
            </a>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};
export default Report;
