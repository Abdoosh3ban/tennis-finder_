import { Link } from 'react-router-dom';
import { Trophy, Facebook, Twitter, Instagram, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">TennisFinder</span>
            </div>
            <p className="text-sm text-gray-400">
              Connect, play, and shop - your all-in-one tennis platform.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courts" className="hover:text-white">Book Courts</Link></li>
              <li><Link to="/matchmaking" className="hover:text-white">Find Partners</Link></li>
              <li><Link to="/marketplace" className="hover:text-white">Shop Equipment</Link></li>
              <li><Link to="/community" className="hover:text-white">Join Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
              <li><a href="#partners" className="hover:text-white">Partner Clubs</a></li>
              <li><a href="#careers" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#cancellation" className="hover:text-white">Cancellation Policy</a></li>
              <li><Link to="/admin" className="hover:text-green-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Admin Panel
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 TennisFinder. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#twitter" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#instagram" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}