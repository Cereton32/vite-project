import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#0a192f] text-gray-300 py-6 text-center">
      <div className="container mx-auto">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-teal-400 transition duration-300">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-teal-400 transition duration-300">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-teal-400 transition duration-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;