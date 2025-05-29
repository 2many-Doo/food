"use client";

import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  onSuccess: () => void;
  onCancel?: () => void;
};

export const AddFood = ({ onSuccess, onCancel }: Props) => {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const validationSchema = Yup.object({
    foodName: Yup.string().required("Хоолны нэр шаардлагатай"),
    price: Yup.string().required("Үнэ шаардлагатай"),
    image: Yup.string()
      .url("Зураг URL буруу байна")
      .required("Зураг шаардлагатай"),
    ingredients: Yup.string().required("Орц шаардлагатай"),
    category: Yup.string().required("Категори ID шаардлагатай"),
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(event.target.files as FileList)[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const from = new FormData();
  };

  return (
    <div
      ref={formRef}
      className="border rounded-xl p-5 mt-8 bg-gray-50 shadow w-[600px] mx-auto "
    >
      <p className="text-xl font-semibold mb-4">Хоол нэмэх</p>

      <Formik
        initialValues={{
          foodName: "",
          price: "",
          image: "",
          ingredients: "",
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await axios.post(
              "http://localhost:8000/food",
              {
                ...values,
                category: [values.category],
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            resetForm();
            setMessage("Амжилттай нэмэгдлээ!");
            onSuccess();
          } catch (error) {
            console.error("Алдаа гарлаа:", error);
            setMessage("Алдаа гарлаа.");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <p>Food name</p>
                <Field
                  name="foodName"
                  placeholder="Type food name"
                  className="border p-2 rounded"
                />
                {touched.foodName && errors.foodName && (
                  <div className="text-red-500">{errors.foodName}</div>
                )}
              </div>
              <div>
                <p>Food price</p>
                <Field
                  name="price"
                  placeholder="Enter price..."
                  className="border p-2 rounded"
                />
                {touched.price && errors.price && (
                  <div className="text-red-500">{errors.price}</div>
                )}
              </div>
            </div>
            <p>Ingredients</p>
            <Field
              name="ingredients"
              placeholder="List ingredients..."
              className="border pb-15 rounded"
            />
            {touched.ingredients && errors.ingredients && (
              <div className="text-red-500">{errors.ingredients}</div>
            )}
            <input
              type="file"
              className="p-16 border border-dashed border-blue-400 bg-[#f4f7ff]"
            />
            {touched.image && errors.image && (
              <div className="text-red-500">{errors.image}</div>
            )}

            {/* <Field
              name="category"
              placeholder="Категорийн ID"
              className="border p-2 rounded"
            />
            {touched.category && errors.category && (
              <div className="text-red-500">{errors.category}</div>
            )} */}

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black  text-white py-2 px-4 ml-auto rounded hover:bg-blue-700"
              >
                Add Dish
              </button>

              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className=" hover:text-black p-2 rounded-full absolute top-12 right-4 bg-gray-300"
                >
                  <X />
                </button>
              )}
            </div>

            {message && <p className="text-green-600">{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
