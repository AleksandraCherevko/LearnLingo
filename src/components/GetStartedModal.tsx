import { useEffect } from "react";
import Modal from "./Modal";
import css from "./GetStartedModal.module.css";

type Props = {
  onClose: () => void;
};

export default function GetStartedModal({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Modal onClose={onClose}>
      <div className={css.getStartedModalWrapper}>
        <h2 className={css.getStartedModalTitle}>
          We’re happy to see you on our platform!
        </h2>
        <p className={css.getStartedModalText}>
          Choose your teacher, book a trial lesson, and start learning English
          today.
        </p>
        <p className={css.getStartedModalText}>
          Please sign in or create an account to easily save your favorite
          teachers and manage your lessons.
        </p>
      </div>
    </Modal>
  );
}
