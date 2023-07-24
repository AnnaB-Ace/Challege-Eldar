import { Routes, Route, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/storeContext";
import { HomeModule, LoginModule } from "../modules";

function App() {
  const { isRole } = useGlobalContext();
  return (
    <Routes>
      <Route path="/" element={<LoginModule />} />
      {isRole && <Route path="/home" element={<HomeModule />} />}
      {!isRole && <Route path="*" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}

export default App;
