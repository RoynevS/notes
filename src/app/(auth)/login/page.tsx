import { login } from "@/actions/authActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <main>
      <form action={login}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="text-black" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="text-black" />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
