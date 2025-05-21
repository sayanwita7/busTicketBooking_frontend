import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
function Footer() {
  return (
    <section className="bg-[#131313] py-6 border-t border-purple-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 lg:w-1/3 text-purple-900">
            <div className="mb-3">
              <Logo width="100px" />
            </div>
          </div>

        {/* Divider */}
        <div className="mt-8 border-t border-purple-300 pt-4 text-center text-sm text-purple-600">
          💖 Making Bus Booking Easier!
        </div>
      </div>
      </div>
    </section>
  );
}

export default Footer;
