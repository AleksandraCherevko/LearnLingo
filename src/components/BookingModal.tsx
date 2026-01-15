import Modal from "./Modal";
import BookingForm from "./BookingForm";
import type { Teacher } from "../types/teacher";
import css from "./BookingModal.module.css";
import SuccessModal from "./SucceessModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
};

export default function BookingModal({ isOpen, onClose, teacher }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  if (!isOpen) return null;
  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseAll = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {!showSuccess && (
        <Modal onClose={onClose}>
          <div className="container">
            <h2 className={css.bookingModalTitle}>Book trial lesson</h2>
            <p className={css.bookingModalAfterTitle}>
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </p>
            <div className={css.bookingModalImgNameWrapper}>
              <img
                className={css.bookingModalImg}
                src={teacher.avatar_url}
                width={44}
                height={44}
                alt={`${teacher.name} ${teacher.surname}`}
              />
              <div className={css.bookingModalTeacherNameWrapper}>
                <p className={css.bookingModalImgAfterTitle}>Your teacher</p>
                <p
                  className={css.bookingModalTeacherName}
                >{`${teacher.name} ${teacher.surname}`}</p>
              </div>
            </div>
            <BookingForm onSuccess={handleSuccess} />
          </div>
        </Modal>
      )}
      {showSuccess && <SuccessModal onClose={handleCloseAll} />}
    </>
  );
}
