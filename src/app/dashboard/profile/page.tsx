'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

  // Otra manera de usar el session es con la funcion userSession
  // Pero debemos usarlo en un Server Component a lo mas alto de nuestras rutas layout superior
  // src/app/auth/components/AuthProvider.tsx
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session)
  }, [])

  return (
    <div>
      <h1>Hello Page</h1>
      <div>{session?.user?.name ?? 'No user name'}</div>
      <div>{session?.user?.image ?? 'No image'}</div>
      <div>{session?.user?.email ?? 'No email'}</div>
    </div>
  );
}