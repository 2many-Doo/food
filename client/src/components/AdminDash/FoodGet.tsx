"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddFood } from "./AddFood";
import { Plus } from "lucide-react";

type FoodType = {
  foodName: string;
  image: string;
  price: string;
  ingredients: string;
  category: string[];
};

export const FoodGet = () => {
  const [food, setFood] = useState<FoodType[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/food", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFood(res.data);
    } catch (err) {
      console.error("Алдаа:", err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white w-full mt-6 rounded-xl">
      <p className="text-2xl pl-5 pt-5 font-semibold mb-4">Food List</p>

      <div className="grid lg:grid-cols-4 gap-5 p-5">
        <div className="border border-dashed border-red-500 flex flex-col justify-center items-center rounded-2xl">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-500 text-white px-2 py-2  rounded-full hover:scale-110"
          >
            <Plus />
          </button>
          <p className="pt-6">Add new Dish to Salads </p>
        </div>
        {food.map((item, i) => (
          <div
            key={i}
            className="border rounded-2xl h-auto text-gray-600 bg-gray-100 shadow-md"
          >
            <div className="w-full p-4 flex justify-center">
              <Image
                width={200}
                height={270}
                alt={item.foodName}
                src={item.image || "/image/logo.svg"}
              />
            </div>

            <div className="flex justify-between px-4 pt-1">
              <p className="text-red-600 font-medium">{item.foodName}</p>
              <p className="text-black">{item.price}</p>
            </div>

            <div className="px-4 pt-2 pb-4">
              <p className="text-sm">{item.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
      {showAddForm && (
        <AddFood
          onSuccess={() => {
            fetchCategories();
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};
