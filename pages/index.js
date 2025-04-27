import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import EventCard from '../components/EventCard';
import Header from '../components/Header';

export default function Home() {
  const { user, plan } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snaps = await getDocs(collection(db, 'events'));
      setEvents(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, [user]);

  if (!user) return <p className="p-8">Por favor, <a href="/login">login</a>.</p>;
  if (!plan) return <p className="p-8">Tu periodo de prueba expiró. Contacta al admin.</p>;

  return (
    <>
      <Header />
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <h1 className="text-white text-2xl col-span-full">Eventos disponibles</h1>
        {events.map(ev => <EventCard key={ev.id} event={ev} />)}
      </main>
    </>
  );
}
