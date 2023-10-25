"use client"

import { useRouter } from "next/navigation"

export default function ResetPassword(){
  const router = useRouter();
  router.push('/login');
}