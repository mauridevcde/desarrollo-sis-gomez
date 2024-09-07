import {
  Avatar,
  Button,
  FormLabel,
  Grid2,
  Input,
  Paper,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";

export const Login = () => {
  const paperStyle = {
    height: "75vh",
    width: 450, 
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
  };

  const { register, handleSubmit } = useForm();

  const recibiendoDatosDelForm = (datos) => {
    console.log(datos)
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
              {...register("name")}
              name="name"
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
            <br />
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
