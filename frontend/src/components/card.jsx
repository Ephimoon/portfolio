import React from 'react'

const Card = ({ name, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer mx-auto w-full max-w-2xl aspect-[16/11]"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Card
