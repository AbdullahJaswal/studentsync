import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function fetchData(path: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access}`,
    },
  });

  return data.json();
}
