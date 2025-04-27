import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Header from '../../components/Header';
import Clapper from 'clapper-js';

export default function EventPage() {
  const { id } = useRouter().query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const snap = await getDoc(doc(db, 'events', id));
      if (snap.exists()) setEvent({ id: snap.id, ...snap.data() });
    })();
  }, [id]);

  if (!event) return <p className="p-8">Cargando...</p>;
  return (
    <>
      <Header />
      <div className="p-8 bg-black min-h-screen text-white">
        <h1 className="text-2xl mb-4">{event.title}</h1>
        <div className="mb-4">
          <Clapper src={event.streamUrl} autoplay controls />
        </div>
        <p>{event.description}</p>
      </div>
    </>
  );
}
