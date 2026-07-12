import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low py-stack-lg w-full relative z-30">
      <div className="flex flex-col md:flex-row justify-between items-start px-container-margin max-w-7xl mx-auto gap-gutter">
        <div className="flex flex-col gap-4 max-w-md">
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary">Localite</h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Redefining local discovery with a touch of modern nobility. Connect with your community in spaces that inspire.
          </p>
          <p className="font-label-caps text-label-caps text-on-surface opacity-60">
            © 2024 Localite. Modern Nobility in Local Connection.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-stack-md mt-stack-md md:mt-0">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-primary mb-2">EXPLORE</span>
            <Link to="/dashboard" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Discovery</Link>
            <Link to="/map" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Events Map</Link>
            <Link to="/network" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Member Circles</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-primary mb-2">RESOURCES</span>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Partner Program</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Press Kit</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Contact Us</a>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-primary mb-2">LEGAL</span>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Terms of Service</a>
            <a href="#" className="text-on-surface-variant hover:text-secondary transition-colors text-body-md">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
