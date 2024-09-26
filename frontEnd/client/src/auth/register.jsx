import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import logocapicorp from "../assets/capicorppn.png";
import Select from "react-select";
import { registerNew } from "../api/register/useRegister";
import { validaObject } from "../utils/scripts";
import Alert from "@mui/material/Alert";
import { Bounce, ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const { register, handleSubmit, control } = useForm();
  const [userExist, setUserExist] = useState(false);

  const navigate = useNavigate();

  const seleccionDeSexo = [
    { value: "H", label: "Hombre" },
    { value: "M", label: "Mujer" },
  ];

  const addUserRegister = useMutation({
    mutationFn: registerNew,
    onSuccess: (data) => {
      if (data.data.msg == "Usuario Registrado con exito") {
        console.log("dentro");

        toast.success("✅ Usuario Registrado con Exito!", {
          position: "top-right",
          autoClose: 1900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setUserExist(true);
      }
    },
  });

  const recibiendoDatosDelForm = (datos) => {
    if (validaObject(datos)) {
      console.log(datos);
      addUserRegister.mutate(datos);
    } else {
      console.log("error");
    }
  };

  return (
    <div className="flex flex-wrap items-center">
      <ToastContainer />
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="py-17.5 px-26 text-center">
          <img className="hidden dark:block" src={logocapicorp} alt="Logo" />
          <img className="dark:hidden" src={logocapicorp} alt="Logo" />

          <p className="2xl:px-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </p>

          <span className="mt-15 inline-block">
            <img
              src="https://exportou.com/wp-content/uploads/2022/04/Registrate-aqui.png"
              alt="registrese"
            />
          </span>
        </div>
      </div>

      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span className="mb-1.5 block font-medium">Bienvenido</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Registrate a CapiCorp
          </h2>

          <form onSubmit={handleSubmit(recibiendoDatosDelForm)}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Nombre y Apellido
              </label>
              <div className="relative">
                <input
                  {...register("Nombre", { required: true })}
                  name="Nombre"
                  type="text"
                  placeholder="Ingrese su Nombre y Apellido"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Usuario
              </label>
              <div className="relative">
                <input
                  {...register("Usuario", { required: true })}
                  name="Usuario"
                  type="text"
                  placeholder="Ingrese su usuario"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {!userExist ? (
                  <></>
                ) : (
                  <div>
                    <Alert
                      style={{ marginTop: "1px" }}
                      variant="filled"
                      severity="error"
                    >
                      El usuario ya se encuentra en uso, favor elegir otro.
                    </Alert>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                        fill=""
                      />
                      <path
                        d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <input
                  {...register("FechaNac", { required: true })}
                  name="FechaNac"
                  type="date"
                  placeholder="Ingrese su Fecha de Nacimiento"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Sexo
              </label>
              <div className="relative">
                <Controller
                  name="sexo"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={seleccionDeSexo} />
                  )}
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                value="Registrarme"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>

            <div className="mt-6 text-center">
              <p>
                Ya tienes una cuenta?{" "}
                <Link to="/" className="text-primary">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
