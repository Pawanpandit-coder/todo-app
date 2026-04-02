import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { LoginProvider } from "./context/LoginContext";
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
