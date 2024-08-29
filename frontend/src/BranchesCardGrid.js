import React from 'react';

const BranchesCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg mx-10 my-6 shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <div className="w-full h-px bg-gray-200 mb-4"></div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const BranchesCardGrid = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
      {cards.map((card) => (
        <BranchesCard key={card._id} title={card.title} description={card.description} />
      ))}
    </div>
  );
};

export default BranchesCardGrid;