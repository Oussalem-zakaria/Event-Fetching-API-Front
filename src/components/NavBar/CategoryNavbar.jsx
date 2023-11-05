// CategoryNavbar.jsx
import React from 'react';
import { FaAngleRight, FaHouseChimney } from 'react-icons/fa6';
import CategoryLink from './CategoryLink';

const CategoryNavbar = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <nav className="flex justify-center mb-9 text-gray-600 font-semibold">
            <ul className="flex items-center space-x-2 bg-slate-100 px-5 py-2 rounded-md shadow-lg">
                <li>
                    <a href="#"
                        className={`${selectedCategory === '' ? 'text-sky-700' : 'text-slate-800'} capitalize hover:text-sky-700`}
                        onClick={() => setSelectedCategory('')}
                    ><FaHouseChimney /></a>
                </li>
                <li>
                    <span className="text-slate-800"><FaAngleRight /></span>
                </li>
                {categories.map(((categorie, index) => (
                    <CategoryLink
                        key={index}
                        index={index}
                        categories={categories}
                        categorie={categorie}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                )))}
            </ul>
        </nav>
    );
}

export default CategoryNavbar;