import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-white">
      <div className="max-w-content mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left: Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <h2 className="text-xl font-semibold text-fg tracking-tight">
              localite
            </h2>
            <p className="text-body-sm text-fg-muted leading-relaxed">
              Find your people nearby. Discover events, join sports matches,
              and connect with your local community.
            </p>
          </div>

          {/* Right: Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-semibold text-fg mb-1">
                Explore
              </span>
              <Link
                to="/events"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Events
              </Link>
              <Link
                to="/map"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Map
              </Link>
              <Link
                to="/network"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Community
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-semibold text-fg mb-1">
                Resources
              </span>
              <Link
                to="/partners"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Partner program
              </Link>
              <Link
                to="/contact"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-semibold text-fg mb-1">
                Legal
              </span>
              <Link
                to="/terms"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Terms of service
              </Link>
              <Link
                to="/privacy"
                className="text-body-sm text-fg-muted hover:text-fg transition-colors duration-200"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-6 border-t border-border">
          <p className="text-caption text-fg-faint">
            &copy; {new Date().getFullYear()} Localite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
