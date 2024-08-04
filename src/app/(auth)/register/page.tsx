import { register } from "@/actions/authActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <main>
      <form action={register}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="text-black" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="text-black" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="text-black" />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            className="text-black"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default RegisterPage;
