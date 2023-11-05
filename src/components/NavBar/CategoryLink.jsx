// CategoryLink.jsx
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

const CategoryLink = ({ categories, categorie, selectedCategory, setSelectedCategory, index }) => {
    return (
        <React.Fragment>
            <li>
                <a href="#"
                    onClick={() => setSelectedCategory(categorie.id)}
                    className={`${selectedCategory === categorie.id ? 'text-sky-700' : 'text-slate-800'} capitalize hover:text-sky-700`}
                >{categorie.name}</a>
            </li>
            <li>
                {index < categories.length - 1 ? <span className="text-slate-800"><FaAngleRight /></span> : ""}
            </li>
        </React.Fragment>
    );
}

export default CategoryLink;