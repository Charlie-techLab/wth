import React, { useEffect, useState } from 'react';
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet from "../models/Pet";
import Hours from "../components/Hours";

const Index = ({ initialPets }) => {
  const [pets, setPets] = useState(initialPets);

  useEffect(() => {
    const fetchPets = async () => {
      const res = await fetch('/api/pets');
      const data = await res.json();
      setPets(data);
    };

    if (!initialPets) {
      fetchPets();
    }
  }, [initialPets]);

  if (!pets) {
    return <div>Cargando mascotas...</div>;
  }

  return (
    <div>
      <Hours />
      <h1>Lista de Mascotas</h1>
      {pets.length === 0 ? (
        <p>No hay mascotas disponibles.</p>
      ) : (
        pets.map((pet) => (
          <div key={pet._id}>
            <div className="card">
              <img src={pet.image_url} alt={pet.name} />
              <h5 className="pet-name">{pet.name}</h5>
              <div className="main-content">
                <p className="owner">Dueño: {pet.owner_name}</p>
                <div className="likes info">
                  <p className="label">Le gusta</p>
                  <ul>
                    {pet.likes.map((like, index) => (
                      <li key={index}>{like}</li>
                    ))}
                  </ul>
                </div>
                <div className="dislikes info">
                  <p className="label">No le gusta</p>
                  <ul>
                    {pet.dislikes.map((dislike, index) => (
                      <li key={index}>{dislike}</li>
                    ))}
                  </ul>
                </div>
                <div className="btn-container">
                  <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                    <button className="btn edit">Editar</button>
                  </Link>
                  <Link href="/[id]" as={`/${pet._id}`}>
                    <button className="btn view">Ver</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const result = await Pet.find({});
  const pets = result.map((doc) => {
    const pet = doc.toObject();
    pet._id = pet._id.toString();
    return pet;
  });
  return { props: { initialPets: JSON.parse(JSON.stringify(pets)) } };
}

export default Index;
//comments