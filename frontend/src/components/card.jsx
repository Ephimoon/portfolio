import React from 'react'

const Card = ({ name, image, onClick }) => {
  const hasImage = typeof image === 'string' && image.trim().length > 0

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer mx-auto w-full max-w-2xl aspect-[16/11] flex items-center justify-center"
    >
      {hasImage ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center p-6 
          bg-gradient-to-br from-accent via-first to-accent
          hover:from-first hover:via-accent hover:to-first
          transition-all duration-500 ease-in-out"
        >
          <h3 className="text-center text-xl md:text-2xl font-mono font-bold text-second drop-shadow-md px-4">
            {name}
          </h3>
        </div>
      )}
    </div>
  )
}

export default Card
