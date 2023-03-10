import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './Calendar.module.css';
import axios from 'axios';
import { theme } from '../theme';
import { Button, Modal } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { UpdatesActivies } from '../updateActivies/updateActivies';

export const axiosConfig= {
  headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
  }
}

export const CalendarPage = () => {
  const [Clicked, setClicked] = useState(false);
  const [ClikedInfo, setClickedInfo] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
    axios.post('http://localhost:3500/token',{token: localStorage.getItem('token')}).then((data) => {
      localStorage.setItem('slug', data.data.slug)
      axios.get('http://localhost:3500/activities/'+localStorage.getItem('slug'), axiosConfig).then(response => {
        const newData = response.data.map(element => ({
          idlayer: element.id,
          status: element.status,
          title: element.name,
          description: element.description,
          start: element.datestarter, 
          end: element.datefinish,
          className: 'fc-event-'+element.status
        }));
        console.log(newData);
        setEvents(newData);
        console.log(response)
      }).catch(error => {
        localStorage.clear();
        window.location.href = '/';
      })  
    }).catch(error => {
      localStorage.clear();
      window.location.href = '/';
    })  
  }
}, []);

  function handlelogout() {
    console.log(events);
    localStorage.clear();
    window.location.href = '/';
  }

  const handleEventClick = (info) => {
    setClicked(!Clicked);
    setClickedInfo(info);
    console.log(info.event);
    localStorage.setItem('title', info.event._def.extendedProps.idlayer);
    localStorage.setItem('evento', info.event);

  };
  const handleEventRender = (info) => {
    info.el.style.cursor = 'pointer';
  };
  return (
    <div>
      {Clicked ? (
        <Modal open sx={{width: '50%', margin: 'auto', marginTop: '20px'}}>
          <div className={styles.floatDiv}>
            <h1>{ClikedInfo.event.title}</h1>
            <p>{ClikedInfo.event.extendedProps.description}</p>
            {ClikedInfo.event.end != null   ? (
                          <div>          
                          <p>Dia Fim: {JSON.stringify(ClikedInfo.event.end).split('T')[0].split('"')}</p>
                          <p>Hora Fim: {JSON.stringify(ClikedInfo.event.end).split('T')[1].split('"')[0].split(':')[0] + ':' +JSON.stringify(ClikedInfo.event.end).split('T')[1].split('"')[0].split(':')[1]}</p>
                          </div>
            ) : null}

          <p>Status: {ClikedInfo.event._def.extendedProps.status}</p>

          <Box gap={2} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
            <br/>
            <UpdatesActivies title={ClikedInfo.event.title} description={ClikedInfo.event.extendedProps.description} />
            <Button sx={{width: '100%' }} variant='outlined' color='error' onClick={() => {setClicked(!Clicked)}}>Close</Button>
            </Box>            
          
          </div>
        </Modal>
      ) : null}




      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
        <div  style={{ marginLeft: '30%' }}></div>

        <FullCalendar
          locale={'pt-br'}
          timeHint="HH:mm"
          timeZoneParam={'America/Sao_Paulo'}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={650}
          contentHeight={'auto'}
          aspectRatio={3.1}
         // eventColor={'#939'}
          eventTextColor={'#fff'}
          fixedWeekCount={false}
          headerToolbar={{
            left: 'today',
            center: 'title',
            right: 'prev,next',
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista',
          }}
          events={events}
          eventClick={(e) => {
            handleEventClick(e);
          }}
          eventMouseEnter={(e) => {
            handleEventRender(e);
          }}
        />
        
        <div style={{marginRight: '30%'}}></div>
      </div>
      <div className={styles.SideBar} /* LADO DOS BOT??ES*/>
      <ThemeProvider theme={theme}>

          <Box
          sx={
            {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }
          }
          gap={2}
          >
              <Button variant='outlined' 
               sx={{
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
              color="third"
              onClick={() => {window.location.href = '/user/register'}}>
                Cadastrar Atividade
              </Button>


              <Button variant='outlined' 
              sx={{
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
              color="third"
              onClick={handlelogout}>
                Logout
              </Button>

              </Box>
        </ThemeProvider>
        </div>
      
    </div>
  );
};
