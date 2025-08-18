"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validation";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post("/signup", data);
      router.push("/verify-email");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-6 shadow rounded bg-white">
      <input placeholder="Name" {...register("name")} className="border p-2 rounded" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input placeholder="Email" type="email" {...register("email")} className="border p-2 rounded" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input placeholder="Password" type="password" {...register("password")} className="border p-2 rounded" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <input placeholder="Confirm Password" type="password" {...register("confirmPassword")} className="border p-2 rounded" />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

      <select {...register("role")} className="border p-2 rounded">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Sign Up</button>
    </form>
  );
}
