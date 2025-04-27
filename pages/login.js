import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isNew, setIsNew] = useState(false);
  const handle = async () => {
    try {
      if (isNew) await createUserWithEmailAndPassword(auth, email, pass);
      else await signInWithEmailAndPassword(auth, email, pass);
      window.location.href = '/';
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <img src="/logo.png" className="h-16 mb-8" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mb-4 p-2 rounded" />
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="mb-4 p-2 rounded" />
      <button onClick={handle} className="bg-blue-600 px-4 py-2 rounded">
        {isNew ? 'Registrar' : 'Login'}
      </button>
      <p className="mt-4 text-white">
        <span onClick={()=>setIsNew(!isNew)} className="underline cursor-pointer">
          {isNew ? 'Ya tienes cuenta? Login' : 'Nuevo? Crear cuenta'}
        </span>
      </p>
    </div>
  );
}
