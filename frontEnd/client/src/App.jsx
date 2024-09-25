import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';

import Loader from "./dashboard/Loader/loader";
import DefaultLayout from "./dashboard/defaultLayout/DefaultLayout";
import { Login } from "./auth/login";
import Clientes from "./components/clientes/clientes";
import { Proveedores } from "./components/proveedores/proveedores";
import { useAuthStore } from "./store/authStore";

function App() {
  ///USE STATE: ESTADO DEL COMPONENTE.
  const verifyToken = useAuthStore.getState().isAuth;
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  //USE EFFECT.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  //mantener en un estado global

  const login = verifyToken;

  return loading ? (
    <Loader />
  ) : !login ? (
    <Login />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              {/* <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <h1>inicio</h1>
            </>
          }
        />
        <Route
          path="/clientes"
          element={
            <>
              {/* <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" /> */}
              <Clientes />
            </>
          }
        />
        <Route
          path="/proveedores"
          element={
            <>
              {/* <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Profile /> */}
              <Proveedores />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              {/* <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormElements /> */}
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              {/* <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <FormLayout /> */}
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              {/* <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Tables /> */}
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              {/* <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Settings /> */}
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              {/* <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Chart /> */}
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              {/* <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Alerts /> */}
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              {/* <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <Buttons /> */}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {/* <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn /> */}
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              {/* <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp /> */}
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
