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

export default async function Home() {
  const pokemons = await getPokemons();
  return (
    <main className='text-center'>
      <FilterComponent pokemons={pokemons} />
    </main>
  )
}
