"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema } from "@/lib/validation";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function VerifyEmailForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post("/verify-email", data);
      router.push("/signin");
    } catch (err: any) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-6 shadow rounded bg-white">
      <input placeholder="Email" type="email" {...register("email")} className="border p-2 rounded" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input placeholder="OTP" {...register("OTP")} className="border p-2 rounded" />
      {errors.OTP && <p className="text-red-500">{errors.OTP.message}</p>}

      <button type="submit" className="bg-green-600 text-white p-2 rounded">Verify</button>
    </form>
  );
}
