"use client";

import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AddCategory } from "./AddCategory";

type Category = {
  _id: string;
  categoryName: string;
};

export const DishesCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/food-category");
      setCategories(res.data);
    } catch (err) {
      console.error("Алдаа:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white h-50 w-490 mt-25 rounded-xl">
      <div className="p-6">
        <p className="pb-6 text-2xl font-semibold">DishesCategory</p>
        <div className="flex gap-4 flex-wrap">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border border-gray-200 rounded-4xl w-36 py-1 text-center hover:bg-gray-100 cursor-pointer"
            >
              <p>{category.categoryName}</p>
            </div>
          ))}
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-500 text-white px-2 rounded-full hover:scale-110"
          >
            <Plus />
          </button>
        </div>

        {showAddForm && (
          <>
            <div className="fixed inset-0  bg-opacity-90 backdrop-blur-xs z-40"></div>

            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AddCategory
                onSuccess={() => {
                  fetchCategories();
                  setShowAddForm(false);
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
