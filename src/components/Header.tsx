import { logout } from "@/actions/authActions";
import { auth } from "@/auth";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="mb-8">
      <nav className="max-w-[900px]">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/notes">Notes</Link>
              </li>
              <li>
                <form action={logout}>
                  <button type="submit">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
