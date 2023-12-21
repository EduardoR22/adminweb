"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ResetPassword(){
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, [])
}