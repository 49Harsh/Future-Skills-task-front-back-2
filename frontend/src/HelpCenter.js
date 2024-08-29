import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BranchesCardGrid from './BranchesCardGrid';

const HelpCenter = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3000/cards/');
        setCards(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('Failed to fetch help center cards. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  bg-gray-100 text-gray-900">
    {/* header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/32/32" alt="Abstract logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Abstract</span>
            <span className="ml-4 text-gray-400">| Help Center</span>
          </div>
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
            Submit a request
          </button>
        </div>
      </header>


{/* all cards */}
      <main className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-8">How can we help?</h1>
        <div className="relative max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <BranchesCardGrid cards={filteredCards} />
      </main>


{/* footer area */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Abstract</h3>
              <ul className="space-y-2">
                <li>Branches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Help Center</li>
                <li>Release Notes</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Dribbble</li>
                <li>Podcast</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Legal</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <p>info@abstract.com</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>&copy; Copyright 2022</p>
            <p>Abstract Studio Design, Inc.</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;