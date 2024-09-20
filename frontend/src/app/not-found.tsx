import Head from "next/head";
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - StudentSync</title>
      </Head>

      <div className="flex flex-col items-center justify-center m-auto">
        <h2 className="text-3xl font-bold">404 - Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </>
  );
}
