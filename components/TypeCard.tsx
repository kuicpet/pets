import {FC} from 'react'
import Link from 'next/link'
import { AnimalType } from '../shared/interfaces/petfinder.interface'
import {ANIMAL_TYPES} from '../enums'

export interface TypeCardProps {
  className?: string
  type: AnimalType
}

const TypeCard:FC<TypeCardProps> = ({className, type}) => {
  return (
    <li className={`col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 ${className ? `${className}` : ""}`}>
      <div className='flex-1 flex flex-col p-8'>
        <div 
          className='w-40 h-40 flex-shrink-0 mx-auto rounded-full bg-cover bg-no-repeat'
          style={{
            backgroundImage: `url(${ANIMAL_TYPES[type.name].image.url})`,
            backgroundPosition: "center",
            ...ANIMAL_TYPES[type.name].image.styles,
          }}
          role='img' 
          aria-label={`Photo of ${type.name} by ${ANIMAL_TYPES[type.name].photographer.name}`}>
          <h3 className='mt-6 text-gray-900 text-m font-medium'>{type.name}</h3>
        </div>
        <div>
          <div className='-mt-px flex divide-x divide-gray-200'>
            <div className='w-0 flex-1 flex'>
              <Link href={{pathname: '/types/[type]', query: {type: type.id}}}>
                <a>
                  <span>Browse Listings</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TypeCard