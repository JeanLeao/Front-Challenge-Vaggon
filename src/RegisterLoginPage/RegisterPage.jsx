import { useState } from 'react';
import { Button, TextField, ThemeProvider, Grid } from "@mui/material";
import { theme } from "../theme";
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
            <h1> Sign In</h1>
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
                onClick={() => {RegistrarAccount()}}
              >
                {" "}
                Registrar{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}