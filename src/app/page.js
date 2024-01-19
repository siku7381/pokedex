import FilterComponent from '../components/FilterComponent';
import { db } from '../lib/db';

async function getPokemons() {
  const res = await db.pokemon.findMany({
    include: {
      types: true
    }
  });
  console.log({ first: res.map((item) => item.types?.name) })
  return res;
}
export async function getPokemonsFromArray(filteredArray) {
  console.log('called', filteredArray)
  if (filteredArray) {

    const res = await db.pokemon.findMany({
      include: {
        types: true
      },
      where: {
        name: {
          in: filteredArray.map((item) => item.label)
        }

      },
    });
    return res;
  }
  else {
    return await getPokemons();
  }
}

export default async function Home() {
  // const pokemons = await getPokemons();
  const pokemons = await getPokemonsFromArray();
  return (
    <main className='text-center'>
      <FilterComponent pokemons={pokemons} />
    </main>
  )
}
