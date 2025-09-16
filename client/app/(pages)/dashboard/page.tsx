import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  return <h3>Dashboard Page!</h3>;
}
