import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import css from "./BookingForm.module.css";
import Button from "./Button";

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

type Props = {
  onSuccess: () => void;
};

const bookingSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  reason: yup.string().required("Please select a reason"),
});

export default function BookingForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data);
    onSuccess();
  };

  return (
    <div className="css.bookingForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <label className={css.radioLabel}>
            <input
              className={css.radioLabelInput}
              type="radio"
              value="career"
              {...register("reason")}
            />
            <span className={css.customRadio} />
            Career and business
          </label>

          <label className={css.radioLabel}>
            <input
              className={css.radioLabelInput}
              type="radio"
              value="kids"
              {...register("reason")}
            />
            <span className={css.customRadio} />
            Lesson for kids
          </label>

          <label className={css.radioLabel}>
            <input
              className={css.radioLabelInput}
              type="radio"
              value="living"
              {...register("reason")}
            />
            <span className={css.customRadio} />
            Living abroad
          </label>

          <label className={css.radioLabel}>
            <input
              className={css.radioLabelInput}
              type="radio"
              value="exams"
              {...register("reason")}
            />
            <span className={css.customRadio} />
            Exams and coursework
          </label>
          <label className={css.radioLabel}>
            <input
              className={css.radioLabelInput}
              type="radio"
              value="exams"
              {...register("reason")}
            />
            <span className={css.customRadio} />
            Culture, travel or hobby
          </label>

          {errors.reason && (
            <p className={css.bookingError}>{errors.reason.message}</p>
          )}
        </fieldset>
        <div className={css.bookingFormContainer}>
          <input
            className={css.bookingInput}
            {...register("name")}
            placeholder="Full name"
          />
          <p className={css.bookingError}>{errors.name?.message}</p>
          <input
            className={`${css.bookingInput} ${css.bookingInputPosition}`}
            {...register("email")}
            placeholder="Email"
          />
          <p className={css.bookingError}>{errors.email?.message}</p>
          <input
            className={`${css.bookingInput} ${css.bookingInputPosition}`}
            {...register("phone")}
            placeholder="Phone"
          />
          <p className={css.bookingError}>{errors.phone?.message}</p>
        </div>

        <Button type="submit" className={css.bookingBtn}>
          Book
        </Button>
      </form>
    </div>
  );
}
