"use client";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is wrong").required("Email is none"),
    password: Yup.string()
      .min(6, "password must be 6 characters long")
      .required("password is none"),
  });

  const userLoginHandler = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/login", values);
      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      router.push(role === "Admin" ? "/admin" : "/user");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Алдаа гарлаа");
    }
  };

  return (
    <div className=" mx-10 flex items-center justify-between h-screen gap-16">
      <div className="w-100 ml-25 flex flex-col gap-6">
        <div className="">
          <ChevronLeft className="w-4 h-8 text-[#18181B] " />
        </div>
        <div className="">
          <h3 className="font-semibold text-2xl ">Log in</h3>
          <p className="text-[#71717A] text-base font-normal">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => userLoginHandler(values)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border rounded-md h-9  px-3"
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
              <a
                href="/resset-password"
                className="border-b-2 w-fit border-black"
              >
                Forget password
              </a>
              <Button type="submit">Lets go</Button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-2 justify-center">
          <p className="text-gray-500">Already have an account?</p>
          <a href="/sign-up" className="text-blue-500">
            Sign up
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

export default LoginPage;
