import { Route, Navigate } from "react-router-dom";
import { Home, NewBike } from "./pages";
import { AuthContextProvider } from "./context/AuthContext";
import { Dashboard } from "./components";
import {
  AvailableBikes,
  ReserveBike,
  UserReservations,
  Reservations,
  AllViews,
  NewUser
} from "./pages";
import { EditUser, SingleUser, SingleBike, EditBike } from "./components";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Dashboard />}>
        <Route path="/home/avail-bikes" element={<AvailableBikes />} />
        <Route path="/home/my-reserve" element={<UserReservations />} />
        <Route path="/home/reserve-bike/:id" element={<ReserveBike />} />
        <Route path="/home/all-reservation/:mode" element={<Reservations />} />

        <Route path="/home/all/:mode" element={ <AllViews /> } />
        <Route path="/home/new-user" element={ <NewUser /> } />
        <Route path="/home/new-bike" element={ <NewBike /> } />
        <Route path="/home/edit-user/:id" element={ <EditUser /> } />
        <Route path="/home/edit-bike/:id" element={ <EditBike /> } />
        <Route path="/home/one-user/:id" element={ <SingleUser /> } />
        <Route path="/home/one-bike/:id" element={ <SingleBike /> } />
      
        <Route path="/home/*" element={<Navigate to={"/home/avail-bikes"} />} />
      </Route>
      <Route path="/*" element={<Navigate to={"/"} />} />
    </AuthContextProvider>
  );
}

export default App;
