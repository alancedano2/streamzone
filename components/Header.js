import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
export default function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <Link href="/">
        <img src="/logo.png" alt="StreamZone" className="h-8" />
      </Link>
      <nav>
        {user ? <Link href="/">Home</Link> : <Link href="/login">Login</Link>}
      </nav>
    </header>
  );
}
