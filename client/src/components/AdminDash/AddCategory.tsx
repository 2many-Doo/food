"use client";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  onSuccess: () => void;
  onCancel?: () => void;
};

export const AddCategory = ({ onSuccess, onCancel }: Props) => {
  const formRef = useRef<HTMLDivElement>(null);

  const validationSchema = Yup.object({
    categoryName: Yup.string().required("Категорийн нэр оруулна уу"),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onCancel?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  const handleSubmit = async (
    values: { categoryName: string },
    { resetForm }: any
  ) => {
    try {
      await axios.post(
        "http://localhost:8000/food-category",
        { categoryName: values.categoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      resetForm();
      onSuccess();
      console.log(values);
    } catch (error) {
      alert("Алдаа гарлаа");
    }
  };
  return (
    <div
      ref={formRef}
      className="mt-6 border p-4 w-115 h-68  rounded-2xl shadow bg-gray-50 relative"
    >
      <p className="text-lg font-medium mb-2">Add new category</p>
      <Formik
        initialValues={{ categoryName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex gap-2 items-start mt-10">
            <div className="flex-1">
              <p className="mb-1">Category Name</p>
              <Field
                name="categoryName"
                type="text"
                placeholder="Type category name..."
                className="w-full border px-3 py-2 rounded-md border-gray-300"
              />
              {errors.categoryName && touched.categoryName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.categoryName}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-black text-white w-40 px-4 py-2 rounded hover:opacity-45 absolute bottom-4 right-4"
            >
              Add category
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className=" hover:text-black p-2 rounded-full absolute top-4 right-4 bg-gray-300"
              >
                <X />
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
