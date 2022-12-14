import type { NextPage, GetStaticProps } from 'next'
import {getPlaiceholder} from 'plaiceholder'
import { AnimalType } from '../shared/interfaces/petfinder.interface'
import Head from 'next/head'
import Image from 'next/image'
import TypeCardsGrid from '../components/TypeCardsGrid'
import { ANIMAL_TYPES } from '../enums'

export interface HomePageProps {
  types: AnimalType[]
}

const {NEXT_PUBLIC_API_URL,NEXT_PUBLIC_CLIENT_ID,NEXT_PUBLIC_CLIENT_SECRET} = process.env

export const getStaticProps: GetStaticProps = async () => {
  let types = []

  try {
    const {access_token} = await (
      await fetch(`${NEXT_PUBLIC_API_URL}/oauth2/token`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: NEXT_PUBLIC_CLIENT_ID,
          client_secret: NEXT_PUBLIC_CLIENT_SECRET,
        }),
      })
    ).json();

    ({types} = await (
      await fetch(`${NEXT_PUBLIC_API_URL}/types`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        },
      })
    ).json())
    
    if(types.length > 0){
      types = await Promise.all(
        types.map(async (type : any) => {
          const {blurhash, img} = await getPlaiceholder(
            ANIMAL_TYPES[type.name].image.url
          );
          return {
            ...type,
            id: type._links.self.href.match(/\/types\/([\w-]+)$/)[1],
            blurhash,
            img: {
              ...img,
              objectPosition: ANIMAL_TYPES[type.name].image.styles?.objectposition || 'center'
            }
          }
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
  return {
    props: {
      types
    },
  };
   
      
};

const Home: NextPage<HomePageProps> = ({types = []}) => {
  return (
   <section>
    <h1 className='text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 sm:text-8xl lg:text-9xl">'>Petfinder</h1>
    <p className='mt-7 mb-7 text-2xl text-gray-400' >Expolore the Petfinder API and help pets find good homes</p>
    {types.length > 0 && <TypeCardsGrid types={types} />}
   </section>
  )
}

export default Home
