import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useSendMessages from "../../../Hooks/useSendMessages";
import 'react-toastify/dist/ReactToastify.css';

const SendMessageInput: React.FC = () => {
  const { loading, sendMessage } = useSendMessages();

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .trim()
        .required("Message cannot be empty or whitespace"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await sendMessage(values.message);
        resetForm();
      } catch (error) {
        toast.error("Failed to send message");
      }
    },
  });

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-sm sticky bottom-0">
      <form
        className="flex items-center w-full"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="Type your message"
          {...formik.getFieldProps("message")}
          className="flex-grow p-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? <div className="loading loading-spinner"></div> : "Send"}
        </button>
      </form>
      {formik.errors.message && formik.touched.message ? (
        <div className="mt-2 text-red-500 font-medium">{formik.errors.message}</div>
      ) : null}
    </div>
  );
};

export default SendMessageInput;
