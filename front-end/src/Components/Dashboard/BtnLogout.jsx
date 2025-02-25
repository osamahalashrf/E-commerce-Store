import { useState } from "react";

export default function BtnLogout({ username, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsDropdownOpen(true)} // عرض الدروب داون عند تمرير الماوس
      onMouseLeave={() => setIsDropdownOpen(false)} // إخفاء الدروب داون عند مغادرة الماوس
    >
      {/* الزر الرئيسي الذي يظهر اسم المستخدم */}
      <button
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 duration-300 text-sm font-medium  focus:outline-none"
      >
        {username}
      </button>

      {/* القائمة المنسدلة */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <button
              onClick={onLogout} // استدعاء دالة الخروج
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


