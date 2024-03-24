import React, { useState } from 'react';
import { ipAddress } from './App';

function InterestModal({ onClose, onSave, userData }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
        setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`${ipAddress}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData, // Include user data from props
          category: selectedCategories,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/';
      } else {
        alert('User registration failed');
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      alert('An error occurred during user registration');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen">
      <div className="flex justify-center items-center mt-5">
        <div className="bg-gray-700 p-6 rounded-md border-2">
          <div className="mb-4 text-center">
            <div className="mb-2 flex flex-wrap">
              <div className={`category-container w-1/4 mb-4 mr-10 ml-5 ${selectedCategories.includes('Sports') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Sports')}>
                <img src="https://st4.depositphotos.com/1005563/25369/i/450/depositphotos_253697550-stock-photo-award-winning-championship-concept-trophy.jpg" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Sports</p>
              </div>
              <div className={`category-container w-1/4 mb-4 mr-10 ml-5 ${selectedCategories.includes('Technology') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Technology')}>
                <img src="https://d1y8sb8igg2f8e.cloudfront.net/images/7_things_you_should_read_about_technologys_rol.width-800.jpg" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Technology</p>
              </div>
              <div className={`category-container w-1/4 mb-4 mr-5 ml-5 ${selectedCategories.includes('Music') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Music')}>
                <img src="https://i.ebayimg.com/images/g/QQAAAOSwk-JiEK3v/s-l1200.webp" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Music</p>
              </div>
              {/* Add more categories here */}
            </div>
            <div className="mb-2 flex flex-wrap">
              <div className={`category-container w-1/4 mb-4 mr-10 ml-5 ${selectedCategories.includes('Business') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Business')}>
                <img src="https://www.thestatesman.com/wp-content/uploads/2020/08/ECONOMY.jpg" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Business</p>
              </div>
              <div className={`category-container w-1/4 mb-4 mr-10 ml-5 ${selectedCategories.includes('Politics') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Politics')}>
                <img src="https://images.blog.airmason.com/wp-content/uploads/2023/10/Understanding-the-Essence-Company-Policies-Definition.png" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Politics</p>
              </div>
              <div className={`category-container w-1/4 mb-4 mr-5 ml-5 ${selectedCategories.includes('Science') ? 'border-2 border-white' : ''}`} onClick={() => toggleCategory('Science')}>
                <img src="https://www.training.com.au/wp-content/uploads/science-stem-feature.png" className="category-image w-full h-32 rounded-md cursor-pointer" />
                <p className="text-sm text-white mt-2">Science</p>
              </div>
              {/* Add more categories here */}
            </div>
            <h2 className="text-xl font-semibold text-white">Choose your preferred Category</h2>
          </div>
          <div className="mt-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:text-black hover:bg-white" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterestModal;
