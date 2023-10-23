// https://github.com/delbaoliveira/website/blob/main/ui/challenge/TextSlider.tsx
import React from 'react'

import { useInterval } from 'react-use'

import classNames from 'lib/classNames'

interface BigTextProps {
  slides: Array<string>
}

export default function BigText({ slides }: BigTextProps) {
  const [currentSlide, setSlide] = React.useState(0)

  const totalSlides = slides.length

  useInterval(() => {
    if (totalSlides - 1 === currentSlide) {
      setSlide(0)
    } else {
      setSlide(currentSlide + 1)
    }
  }, 2000)

  return (
    <div className='flex flex-col items-center text-6xl font-extrabold tracking-tight md:text-9xl'>
      <div className='flex flex-col items-center'>
        <p className='text-2xl tracking-normal sm:text-3xl'>Hallo von Elija</p>
        {slides.map((text, index) => {
          return (
            <span key={text} className='relative block text-center'>
              <span
                className={classNames(
                  'absolute transition duration-1000',
                  currentSlide !== index ? 'opacity-100' : 'opacity-0'
                )}
                aria-hidden={true}
              >
                {text}
              </span>

              <span
                className={classNames(
                  'decoration-clone bg-clip-text text-transparent bg-gradient-to-r',
                  index === 0 ? 'from-green-500 via-green-300 to-green-50' : '',
                  index === 1
                    ? 'from-green-600 via-green-200 to-green-800'
                    : '',
                  index === 2 ? 'from-green-400 to-green-900' : ''
                )}
              >
                {text}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
