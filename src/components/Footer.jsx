function Footer() {
  return (
    <footer className="bg-cocoa-light text-sand-light py-4 h-34">
      <div className="mx-auto text-center flex-col h-full flex items-center justify-center">
        <p>{new Date().getFullYear()} &copy; Holidaze - Stay your way.</p>
        <p className="text-xs text-sand-light mt-2"> NOROFF Project Exam 2025.</p>
      </div>
    </footer>
  );
}

export default Footer;