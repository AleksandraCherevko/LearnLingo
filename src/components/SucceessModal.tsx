import { useEffect } from "react";
import Modal from "./Modal";
import css from "./SuccessModal.module.css";

type Props = {
  onClose: () => void;
};

export default function SuccessModal({ onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Modal onClose={onClose}>
      <div className={css.successModalWrapper}>
        <h2 className={css.successModalTitle}>Thank you!</h2>
        <p className={css.successModalText}>
          We will contact you as soon as possible to arrange a convenient date
          and time for your lesson.
        </p>
      </div>
    </Modal>
  );
}
