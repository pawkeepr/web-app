import { useState } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (event) => {
        if (!event.target.closest('#dropdownMenuButton')) {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative inline-block dark:bg-black" onClick={closeDropdown}>
            <button
                className="bg-gray-200 text-gray-700 rounded px-4 py-2 focus:outline-none"
                type="button"
                id="dropdownMenuButton"
                onClick={toggleDropdown}
            >
                Dropdown
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow" id="dropdownMenu">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                        Funcionou o Drop
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                        Item 2
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">
                        Item 3
                    </a>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
