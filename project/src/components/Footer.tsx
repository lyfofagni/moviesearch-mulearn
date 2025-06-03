import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          Data provided by the OMDb API. This is a demo project.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © {new Date().getFullYear()} CineFlix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;