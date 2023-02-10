import { useState } from 'react';
import { InputNew } from '../Components/Input/InputComponent';
import { ButtonNew } from '../Components/Button/ButtonComponent';
import styles from './Register.module.css';
import axios from 'axios';

export const RegisterPage = () => {
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
  
    function RegistrarAccount() {
      if (pass === '' || name === '') {
        alert('Todos os campos são obrigatorios');
      } else {        
        axios.post('http://localhost:3500/user',{ password: pass, username: name}).then((data) => {
        alert(data.data.message);
        window.location.href = '/';
        }).catch((error) => {
          alert('Erro: Usuario já cadastrado');

        })

      }
    }
    return (
      <div className={styles.containerBody}>
        <div className={styles.container}>
        <h1>Sing In</h1>
  
  
        <div>
          <label>Nome</label>
          <div className="teste">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="seu nome aqui"
            />
          </div>
        </div>
  
        <div>
          <label>Password</label>
          <div>
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              type={'password'}
              placeholder="********"
            />
          </div>
        </div>

        <ButtonNew
            id="buttonRegister"
            value={'Cadastrar'}
            onClick={() => {
              RegistrarAccount();
            }}
          />
      </div> 
    </div>

    )
}