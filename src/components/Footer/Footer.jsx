function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="center">
      <p>All rights reserved &copy; {year}</p>
    </footer>
  );
}

export default Footer;
