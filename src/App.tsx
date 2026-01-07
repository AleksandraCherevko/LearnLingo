import Header from "./components/Header";
import Modal from "./components/Modal";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

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
      {/* Modal */}

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <LoginForm />}
          {modalType === "register" && <RegisterForm />}
        </Modal>
      )}
    </>
  );
}
