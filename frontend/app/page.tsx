"use client"

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

type UserFormData = {
  name: string;
  age: number;
  email: string;
}

type UserResponse = {
  id: number;
  name: string;
  age: number;
  email: string;
}

export default function Home() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>();
  const [users, setUsers] = useState<UserResponse[]>([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    const response = await fetch("http://localhost:8000/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    reset();
    fetchUsers();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-8 rounded shadow w-96">

        <h1 className="text-black text-xl font-bold">Add User</h1>

        <input className="text-black border p-2 rounded" type="text" placeholder="Name" {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input className="text-black border p-2 rounded" type="number" placeholder="Age" {...register("age", { required: "Age is required", valueAsNumber: true })} />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

        <input className="text-black border p-2 rounded" type="email" placeholder="Email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Submit</button>

      </form>

      <div className="mt-8 w-96">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div key={user.id} className="bg-white text-black p-4 rounded shadow mb-2">
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>

    </div>
  );
}