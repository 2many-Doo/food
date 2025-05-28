import { AdminSelect } from "@/components/AdminDash";
import { DishesCategory } from "@/components/AdminDash/DishesCategory";
import { FoodGet } from "@/components/AdminDash/FoodGet";
import React from "react";

const AdminPage = () => {
  return (
    <div className="bg-gray-300 w-screen h-screen flex gap-6">
      <AdminSelect />
      <div>
        <DishesCategory />
        <FoodGet />
      </div>
    </div>
  );
};

export default AdminPage;
