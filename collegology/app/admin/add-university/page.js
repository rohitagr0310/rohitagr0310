"use client";

import { useState } from "react";
import axios from "axios";
import API from "@/config/api";
import { useRouter } from "next/navigation";

const AddUniversity = () => {
  const [newUniversity, setNewUniversity] = useState({
    name: "",
    universityType: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addUniversity = async () => {
    if (newUniversity.name && newUniversity.universityType) {
      setLoading(true);
      try {
        await axios.post(`${API.API_BASE_URL}/api/universities`, newUniversity);
        router.push("/admin/manage-university"); // Redirect back to main page
      } catch (error) {
        console.error("Error adding university:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Add University
        </h2>
        <input
          type="text"
          placeholder="University Name"
          className="w-full p-2 mb-2 border rounded text-black"
          value={newUniversity.name}
          onChange={(e) =>
            setNewUniversity({ ...newUniversity, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="University Type"
          className="w-full p-2 mb-4 border rounded text-black"
          value={newUniversity.universityType}
          onChange={(e) =>
            setNewUniversity({
              ...newUniversity,
              universityType: e.target.value
            })
          }
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => router.push("/manage-universities")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={addUniversity}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add University"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUniversity;
