import { useEffect, useState } from 'react';
import { Button, TextField, ThemeProvider, Grid } from "@mui/material";
import { theme } from "../theme";
import axios from 'axios';

export function LoginPage() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.clear();
    }
  }, []);

  function Entrar() {
    if (name === '' || pass === '') {
      alert('Preencha todos os campos!');
    } else {
      axios.patch('http://localhost:3500/user', { username: name, password: pass }).then((data) => {
        alert('Usuário logado com sucesso\n user: ' + name + '\n senha: ' + pass);
        console.log(data)
        localStorage.setItem('token', data.data.tokenLogin);
        window.location.href = '/user';
      }).catch((error) => {
        alert('Usuario invalido');
        
      })
      // usar axios para fazer a requisição
      // botar um local storage armazenar
    }
  }
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
            <h1> Login In</h1>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Usuario"
                variant="outlined"
                color="success"
                focused={name !== ""}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              fullWidth={true}

                type={"password"}
                label="Senha"
                variant="outlined"
                color="success"
                focused={pass !== ""}
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
              fullWidth={true}
                sx={{
                  "&:hover": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  },
                }}
                variant="outlined"
                color="third"
                onClick={() => Entrar()}
              >
                {" "}
                Entrar{" "}
              </Button>
            </Grid>

            <Grid item md={6} xs={12}>
              <Button
              fullWidth={true}
                sx={{
                  "&:hover": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  },
                }}
                variant="outlined"
                color="third"
                onClick={() => window.location.href = '/register'}
              >
                {" "}
                Registrar{" "}
              </Button>
            
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
