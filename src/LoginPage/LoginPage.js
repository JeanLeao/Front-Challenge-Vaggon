import styles from './LoginPage.module.css';
import { useEffect, useState } from 'react';
import { ButtonNew } from '../Components/Button/ButtonComponent';
import axios from 'axios';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.clear();
    }
  }, []);

  function Entrar() {
    if (email === '' || pass === '') {
      alert('Preencha todos os campos!');
    } else {
      axios.patch('http://localhost:3500/user', { username: email, password: pass }).then((data) => {
        alert('Usuário logado com sucesso\n user: ' + email + '\n senha: ' + pass);
        console.log(data)
        localStorage.setItem('token', data.data.slug);
        window.location.href = '/user';
      }).catch((error) => {
        alert('Usuario invalido');
        
      })
      // usar axios para fazer a requisição
      // botar um local storage armazenar
    }
  }
  return (    
  <div className={styles.containerBody}>
    <div className={styles.container}>
      <strong>Log In</strong>

      <label>Usuario</label>

      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="jeanleao"
      />

      <label>Password</label>

      <input
        onChange={(e) => {
          setPass(e.target.value);
        }}
        type={'password'}
        placeholder="********"
      />

      <ButtonNew
        id="buttonLogin"
        value={'Entrar'}
        onClick={Entrar}
        />

      <ButtonNew
        id="buttonLogin"
        value={'Sing-In'}
        onClick={() => {window.location.href = '/register'}}
        /> 

    </div>
  </div>  
  );
}
