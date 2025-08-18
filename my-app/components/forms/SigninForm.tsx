"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/jobs"); // 👈 after signin → Task 7 page (Job listings)
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-6 shadow rounded bg-white">
      <input placeholder="Email" type="email" {...register("email")} className="border p-2 rounded" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input placeholder="Password" type="password" {...register("password")} className="border p-2 rounded" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Sign In</button>
    </form>
  );
}
