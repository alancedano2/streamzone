import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Header from '../../components/Header';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    (async () => {
      const snaps = await getDocs(collection(db, 'events'));
      setEvents(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-white text-2xl mb-4">Eventos (Admin)</h1>
        <a href="/admin/new" className="underline text-blue-400">Crear Nuevo Evento</a>
        <ul className="mt-4 text-white">
          {events.map(ev => <li key={ev.id}>{ev.title}</li>)}
        </ul>
      </div>
    </>
  );
}
