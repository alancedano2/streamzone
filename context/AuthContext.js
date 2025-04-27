import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({ user: null, plan: null });
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, { role: u.email === 'fraelvillegas180@gmail.com' ? 'admin' : 'user', plan: 'Básico', trialExpires: Date.now() + 7*24*60*60*1000 });
          setPlan('Básico');
        } else {
          const data = snap.data();
          if (data.trialExpires > Date.now()) setPlan(data.plan);
          else setPlan(null);
        }
      } else {
        setUser(null);
        setPlan(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user, plan }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
