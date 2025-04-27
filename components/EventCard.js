import Link from 'next/link';
export default function EventCard({ event }) {
  return (
    <div className="bg-gray-800 rounded overflow-hidden">
      <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-white text-lg">{event.title}</h2>
        <p className="text-gray-400 text-sm">{event.description}</p>
        <Link href={`/event/${event.id}`}>Ver Evento</Link>
      </div>
    </div>
  );
}
