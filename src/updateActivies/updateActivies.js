import { useEffect, useState } from 'react';
import styles from './RegisterActivies.module.css';
import { ButtonNew } from '../Components/Button/ButtonComponent';
import axios from 'axios';
export const UpdatesActivies = () => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


useEffect(() => {
  if (localStorage.getItem('token')) {
    axios.get('http://localhost:3500/activities/'+localStorage.getItem('token')+'/'+localStorage.getItem('title')).then((data) => {
      localStorage.setItem('id',data.data[0].id);
      
    console.log(data);
    }).catch((error) => {
      localStorage.clear();
      window.location.href = '/';
    })
  }else{
    localStorage.clear();
    window.location.href = '/';
  }
}, []);


  function registerNewActivies(){
    const data = {
      name: title,
      description: description,
    };
   axios.patch('http://localhost:3500/activity/'+localStorage.getItem('id'), data).then((data) => {
     alert(data.data.message);
     window.location.href = '/user';
   })
  }

  function deleteEvent(){
    axios.delete('http://localhost:3500/activity/'+localStorage.getItem('id')).then((data) => {
      alert(data.data.message);
      window.location.href = '/user';
    })
  }

  function alternativePendency(){
    axios.patch('http://localhost:3500/activitype/'+localStorage.getItem('id')).then((data) => {
      alert(data.data.message);
      window.location.href = '/user';
    })
  }
  return (
  
  <div className={styles.containerBody}>
    <div className={styles.container}>
      <div style={{display: 'flex'}}>
      <button className={styles.delbutton} onClick={() => {deleteEvent()}}>Deletar</button>
      <button className={styles.attbutton} onClick={()=>{alternativePendency()}} >Atualizar Status</button>
      </div>
      <h3>Update Activies</h3>
      <input placeholder="Your title" type="text" id='title' onChange={(e) => {setTitle(e.target.value)}} required />

      <textarea className={styles.textarea} onChange={(e) => {setDescription(e.target.value)}} placeholder="Type your Description Here...." required></textarea>
      <ButtonNew value='Submit' onClick={()=>{registerNewActivies()}} />
    </div>
  </div>
  );
};
