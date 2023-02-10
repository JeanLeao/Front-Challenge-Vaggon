import { useEffect, useState } from 'react';
import styles from './RegisterActivies.module.css';
import { ButtonNew } from '../Components/Button/ButtonComponent';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
export const RegisterActivies = () => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [dateStart, setDateStart] = useState('');
const [dateEnd, setDateEnd] = useState('');
const [timeStart, setTimeStart] = useState('');
const [timeEnd, setTimeEnd] = useState('');

useEffect(() => {
  if (localStorage.getItem('token')) {
    axios.get('http://localhost:3500/activities/'+localStorage.getItem('token')).then((data) => {
      console.log(data);
    }).catch((error) => {
      window.location.href = '/';
    })
  }else{
    window.location.href = '/';
  }
}, []);

  function registerNewActivies(){
if ((title !== '')){
var newstartdate = (dateStart.split('/')[1]+ "/"+ dateStart.split('/')[0]+"/" + dateStart.split('/')[2]);
var newenddate = (dateEnd.split('/')[1]+ "/"+ dateEnd.split('/')[0]+"/" + dateEnd.split('/')[2]);

const data = {
    name: title,
    description: description,
    datestarter: newstartdate ,
    datefinish: newenddate,
    hourstart: timeStart,
    hourfinish: timeEnd,
    user: localStorage.getItem('token')
  };
  axios.post('http://localhost:3500/activity', data).then((data) => {
    alert(data.data.message);
    window.location.href = '/user';
  })
}else{
  alert('Please enter a valid date');
}
}

  return (
  
  <div className={styles.containerBody}>
    <div className={styles.container}>
      <h3>Register Activies</h3>
      <input placeholder="Your title" type="text" onChange={(e) => {setTitle(e.target.value)}} required />

      <MaskedInput 
      placeholder='Start Date - DD/MM/YYYY'
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      onChange={(e) => {setDateStart(e.target.value)}}
      required={true} />

    <MaskedInput
      placeholder='Start Hour - HH:MM'
      mask={[/\d/, /\d/, ':', /\d/, /\d/]}
      onChange={(e) => {setTimeStart(e.target.value)}}
      required={true} />

      <MaskedInput
        placeholder='End Date - DD/MM/YYYY'
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        onChange={(e) => {setDateEnd(e.target.value)}}
        required={true} />
      
      <MaskedInput 
      placeholder='End Hour - HH:MM'
      mask={[/\d/, /\d/, ':', /\d/, /\d/]}
      onChange={(e) => {setTimeEnd(e.target.value)}}
      required={true} />

      <textarea className={styles.textarea} onChange={(e) => {setDescription(e.target.value)}} placeholder="Type your Description Here...." required></textarea>
      <ButtonNew value='Submit' onClick={()=>{registerNewActivies()}} />
    </div>
  </div>
  );
};
