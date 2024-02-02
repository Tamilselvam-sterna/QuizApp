function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center ">
      <p className="py-2 text-sm font-semibold  text-primary-600 ">
        Copyright &copy; {year} Sterna Security Devices. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
