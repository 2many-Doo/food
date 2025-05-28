"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { QrCode } from "lucide-react";

export const AdminSelect = () => {
  return (
    <div className=" flex flex-col w-51 h-screen gap-10  pt-9 items-center bg-white">
      <div className="flex gap-2 ">
        <Image width={36} height={36} alt="logo" src="/image/logo.svg" />
        <div>
          <p className="font-semibold">NomNom</p>
          <p className="text-[12px] text-gray-600">Swift Delevery</p>
        </div>
      </div>
      <div className="flex gap-6 flex-col">
        <Button variant="secondary">
          <QrCode />
          Food menu
        </Button>
        <div className="flex gap-4 items-center px-4 py-2 rounded-md">
          <Image width={36} height={15} alt="vector" src="/image/Vector.png" />
          <p>Order</p>
        </div>
      </div>
    </div>
  );
};
