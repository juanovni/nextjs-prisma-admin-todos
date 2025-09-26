'use client';

import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import { CiLogout } from 'react-icons/ci'

export const LogoutButton = () => {

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button className="cursor-pointer px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => signIn()}
        className="cursor-pointer px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Login</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}
