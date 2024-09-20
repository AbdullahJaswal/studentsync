'use client'

import {useEffect} from 'react'

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <h2 className="text-2xl font-bold">An error occurred</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
