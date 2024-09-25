import {
  Avatar,
  Button,
  FormLabel,
  Grid2,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { loginRequest } from "../api/auth/useAuth";
import { useMutation } from "@tanstack/react-query";

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const setToken = useAuthStore((state) => state.setAuthInfo);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  const [loginState, setLoginState] = useState(true);

  const addLogin = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if (!data.data.msg) {
        setToken(data.data);
        setIsAuth(true);
        window.location.reload();
      } else {
        setLoginState(false);
        console.log("cambiar a falso");
      }
    },
  });

  const recibiendoDatosDelForm = (datos) => {
    addLogin.mutate(datos);
  };

  const paperStyle = {
    height: "55vh",
    width: 450,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
  };

  return (
    <Grid2 align="center">
      <Paper elevation={10} sx={paperStyle}>
        <Grid2
          height={"130px"}
          alignItems={"center"}
          alignSelf={"center"}
          alignContent={"center"}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
            }}
          ></Avatar>
        </Grid2>
        <Grid2
          height={"70px"}
          alignItems={"center"}
          alignSelf={"center"}
          alignContent={"center"}
        >
          <Typography variant="h5" color="initial">
            INICIAR SESIÓN
          </Typography>
        </Grid2>
        <Grid2>
          <form onSubmit={handleSubmit(recibiendoDatosDelForm)}>
            <br />
            <br />
            <FormLabel>Usuario</FormLabel>
            <br />

            <Input
              {...register("Usuario")}
              name="Usuario"
              type="text"
              placeholder="Ingrese su Usuario"
            />
            <br />
            <br />
            <br />

            <FormLabel>Contraseña</FormLabel>
            <br />
            <Input
              {...register("pass")}
              name="pass"
              type="password"
              placeholder="Ingrese su contraseña"
            />
            <br />
            <br />
            <p>{loginState ? '' : 'Usuario o contraseña invalida.'}</p>
            <br />
            <Button type="submit" variant="contained">
              Ingresar
            </Button>
          </form>
        </Grid2>
      </Paper>
    </Grid2>
  );
};
