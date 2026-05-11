import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Trophy, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
      transparent ? 'bg-transparent' : 'border-b border-[#28492d] bg-[#163E1B]/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className={`${transparent ? 'text-white' : 'text-white'}`}>
              TennisFinder
            </span>
          </Link>

          {/* Desktop Navigation 
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/courts" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
              Courts
            </Link>
            <Link to="/matchmaking" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
              Find Partners
            </Link>
            <Link to="/marketplace" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
              Marketplace
            </Link>
            <Link to="/community" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
              Community
            </Link>
            <Link to="/demochat" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
              Demo Chat
            </Link>
          </nav>
          */}

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className={transparent ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10 hover:text-white'}
            >
              Log in
            </Button>
            <Button onClick={() => navigate('/signup')} className="bg-[#2E7D32] hover:bg-[#1F5A24]">
              Sign Up
            </Button>
                <Button
            variant="outline"
            className="border-white/20 bg-white/8 text-white hover:bg-white/12 hover:text-white"
            onClick={() => navigate('/admin')}
          >
            
            Admin Panel
          </Button>
          
          </div>




          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${transparent ? 'text-white' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${transparent ? 'text-white' : 'text-white'}`} />
            )}
          </button>
        </div>


        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">

              <Link to="/courts" className="text-white/85 hover:text-white">
                Courts
              </Link>
              <Link to="/matchmaking" className="text-white/85 hover:text-white">
                Find Partners
              </Link>
              <Link to="/marketplace" className="text-white/85 hover:text-white">
                Marketplace
              </Link>
              <Link to="/community" className="text-white/85 hover:text-white">
                Community
              </Link>
              <Link to="/news" className={`${transparent ? 'text-white hover:text-gray-200' : 'text-white/85 hover:text-white'}`}>
                News
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                <Button variant="outline" className="border-white/20 bg-white/8 text-white hover:bg-white/12 hover:text-white" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-[#2E7D32] hover:bg-[#1F5A24]">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
