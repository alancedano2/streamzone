import { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../../components/Header';

export default function NewEvent() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const handle = async () => {
    let imgUrl = '';
    if (file) {
      const storageRef = ref(storage, `events/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      imgUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'events'), { title, description: desc, imageUrl: imgUrl, streamUrl: url });
    alert('Evento creado');
    window.location.href = '/admin/events';
  };

  return (
    <>
      <Header />
      <div className="p-8 text-white">
        <h1 className="text-2xl mb-4">Crear Evento</h1>
        <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} className="mb-2 p-2 rounded bg-gray-700 w-full" />
        <textarea placeholder="Descripción" value={desc} onChange={e=>setDesc(e.target.value)} className="mb-2 p-2 rounded bg-gray-700 w-full" />
        <input type="file" onChange={e=>setFile(e.target.files[0])} className="mb-2 text-white" />
        <input placeholder="Link m3u8" value={url} onChange={e=>setUrl(e.target.value)} className="mb-4 p-2 rounded bg-gray-700 w-full" />
        <button onClick={handle} className="bg-blue-600 px-4 py-2 rounded">Guardar Evento</button>
      </div>
    </>
  );
}
