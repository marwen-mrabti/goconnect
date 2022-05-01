import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-4 p-3 text-center">
      Copyright &copy; {new Date().getFullYear()} marwen
    </footer>
  );
}

export default Footer;
