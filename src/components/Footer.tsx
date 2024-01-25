function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center">
      <p className="py-1 text-sm font-semibold  text-primary-600 ">
        Copyright &copy; {year} Sterna-Quiz. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
