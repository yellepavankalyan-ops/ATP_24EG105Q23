function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
        <p className="font-medium text-slate-600 mb-1">
          <span className="text-indigo-600"></span> Blog
        </p>
        <p>@{new Date().getFullYear()} </p>
      </div>
    </footer>
  );
}

export default Footer;
