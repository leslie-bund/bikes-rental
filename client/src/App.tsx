import { Route, Navigate } from "react-router-dom";
import { Home } from "./pages";
import { AuthContextProvider } from "./context/AuthContext";
import { Dashboard } from "./components";
import {
  AvailableBikes,
  ReserveBike,
  UserReservations,
  Reservations,
} from "./pages";
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
        <Route path="/home/*" element={<Navigate to={"/home/avail-bikes"} />} />
      </Route>
      <Route path="/*" element={<Navigate to={"/"} />} />
    </AuthContextProvider>
  );
}

export default App;
