import { Route, Navigate } from "react-router-dom";
import { Home } from "./pages";
import { AuthContextProvider } from "./context/AuthContext";
import { Dashboard } from "./components";
import { AvailableBikes } from "./pages";
import "./App.css";

function App() {
  // const { loggedIn } = useContext(AuthContext);
  // const [isOpen, setIsOpen] = useState(false)
  return (
    <AuthContextProvider>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Dashboard />}>
        <Route path="/home/avail-bikes" element={<AvailableBikes />} />
        <Route path="/home/*" element={<Navigate to={"/"} />} />
      </Route>
      <Route path="/*" element={<Navigate to={"/"} />} />
    </AuthContextProvider>
  );
}

export default App;
