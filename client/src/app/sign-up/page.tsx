"use client";

import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Зөв имэйл хаяг оруулна уу")
      .required("Имэйл шаардлагатай"),
    password: Yup.string()
      .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
      .required("Нууц үг шаардлагатай"),
  });

  const userRegisterHandler = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/sign-up",
        values
      );
      alert("Амжилттай бүртгэгдлээ!");
      router.push("/login");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Бүртгэхэд алдаа гарлаа");
    }
  };

  return (
    <div className=" mx-10 flex items-center justify-between h-screen gap-16">
      <div className="w-100 ml-25 flex flex-col gap-6">
        <div className="">
          <ChevronLeft className="w-4 h-8 text-[#18181B]" />
        </div>
        <div className="">
          <h3 className="font-semibold text-2xl ">Sign up</h3>
          <p className="text-[#71717A] text-base font-normal">
            Create a strong password with letters, numbers.
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => userRegisterHandler(values)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full border rounded-md h-9 px-3"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-md h-9 px-3"
                />

                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <Button type="submit">Sign up</Button>
            </Form>
          )}
        </Formik>

        <div className="flex gap-x-4 justify-center">
          <p className="font-normal text-base text-[#71717A]">
            Already have an account?
          </p>
          <a href="/login" className="text-[#2563EB] font-normal text-base">
            Log in
          </a>
        </div>
      </div>

      <div className="relative h-[90%] w-[75%]">
        <Image
          fill
          src="/image/Home.jpg"
          alt="Sign up image"
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
