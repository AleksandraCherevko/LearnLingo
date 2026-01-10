import Header from "./components/Header";
import Modal from "./components/Modal";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Hero from "./components/Hero";
import Skills from "./components/Skills";

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

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <LoginForm />}
          {modalType === "register" && <RegistrationForm />}
        </Modal>
      )}
      <Hero />
      <Skills />
    </>
  );
}
