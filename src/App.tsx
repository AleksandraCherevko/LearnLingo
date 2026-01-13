import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

import Teachers from "./pages/Teachers";
import Home from "./pages/Home";

type ModalType = "login" | "register" | null;

export default function App() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = () => setModalType(null);

  const handleLogin = () => {
    setModalType("login");
  };

  const handleRegister = () => {
    setModalType("register");
  };
  return (
    <>
      <Header onLogin={handleLogin} onRegister={handleRegister} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <LoginForm onSuccess={closeModal} />}
          {modalType === "register" && (
            <RegistrationForm onSuccess={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
}
