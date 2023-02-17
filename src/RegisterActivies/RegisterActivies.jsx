import { useEffect, useState } from 'react';
import { Button, TextField, ThemeProvider, Grid } from "@mui/material";
import { theme } from "../theme";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import axios from 'axios';
import { axiosConfig } from '../CalendarPage/CalendarPage';


export const RegisterActivies = () => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [dateStart, setDateStart] = useState('');
const [dateEnd, setDateEnd] = useState('');
const [hourStart, setHourStart] = useState('');
const [hourEnd, setHourEnd] = useState('');

useEffect(() => {
  if (localStorage.getItem('token')) {
    axios.get('http://localhost:3500/activities/'+localStorage.getItem('slug'),axiosConfig
    ).then((data) => {
      console.log(data);
    }).catch((error) => {
      window.location.href = '/';
    })
  }else{
    window.location.href = '/';
  }
}, []);
function registerNewActivies(){
  var newDateStart = moment(dateStart).format("DD/MM/YYYY");
  var newDateEnd = moment(dateEnd).format("DD/MM/YYYY");
  var newHourStart = moment(hourStart).format("HH:mm");
  var newHourEnd = moment(hourEnd).format("HH:mm");

  if ((title !== '')){
  if (newDateStart  === 'Invalid date' || newDateEnd === 'Invalid date' || newHourStart === 'Invalid date' || newHourEnd === 'Invalid date'){
    alert('Preencha todos os campos corretamente');
  }else{
var newstartdate = (newDateStart.split('/')[1]+ "/"+ newDateStart.split('/')[0]+"/" + newDateStart.split('/')[2]);
var newenddate = (newDateEnd.split('/')[1]+ "/"+ newDateEnd.split('/')[0]+"/" + newDateEnd.split('/')[2]);

const data1 = {
    name: title,
    description: description,
    datestarter: newstartdate,
    datefinish: newenddate,
    hourstart: moment(hourStart).format("HH:mm"),
    hourfinish: moment(hourEnd).format("HH:mm"),
    user: localStorage.getItem('slug')
  };
  axios.post('http://localhost:3500/activity',data1 ,axiosConfig).then((data) => {
    alert(data.data.message);
    window.location.href = '/user';
  })
}}else{
  alert('Please enter a valid title');
}
};

  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
      }}
    >
      <Grid item md={6} xs={12}>
        <Grid container justifyContent="center" alignItems="center" gap={1} sx={{p: '10px'}}>
          <h1> Registrar Evento</h1>
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Title"
              variant="outlined"
              color="success"
              focused={title !== ""}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Grid>
          
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
          
          label="Time Start"
          inputFormat="HH:mm"
          value={hourStart}
          onChange={(e) => setHourStart(e)}
          renderInput={(params) => <TextField {...params} fullWidth color="success" focused={hourStart !== ""}/>}
          />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
            label="Date Start"
            inputFormat="DD/MM/YYYY"
            value={dateStart}
            onChange={(e) => setDateStart(e)}
            renderInput={(params) => <TextField {...params} fullWidth color="success" focused={hourStart !== ""}/>}
            />
          </LocalizationProvider>
          </Grid>


          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
            label="Date End"
            inputFormat="DD/MM/YYYY"
            value={dateEnd}
            onChange={(e) => setDateEnd(e)}
            renderInput={(params) => <TextField {...params} fullWidth color="success" focused={dateEnd !== ""}/>}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
          label="Time End"
          inputFormat="HH:mm"
          value={hourEnd}
          onChange={(e) => setHourEnd(e)}
          renderInput={(params) => <TextField {...params} fullWidth color="success" focused={hourEnd !== ""} />}
          />
          </LocalizationProvider>
          </Grid>

          <TextField multiline rows={4} fullWidth={true}
          label="Description"
          variant="outlined"
          color="success"
          value={description}
          focused={description !== ""}
          
          onChange={(e) => setDescription(e.target.value)}
              />

          <Grid item md={6} xs={12}>
            <Button
            onClick={() => {registerNewActivies()}}
            fullWidth={true}
              sx={{
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
              variant="outlined"
              color="third"
            >
              Registrar Evento
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}
