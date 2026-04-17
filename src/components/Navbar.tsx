export default function Navbar() {
  const links = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech" },
    { name: "Projects", href: "#projects" },
    { name: "Connect", href: "#connect" },
  ];

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-6 py-3 md:px-10 flex items-center justify-center gap-4 sm:gap-8 md:gap-14 lg:gap-16">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide"
            style={{ color: "rgba(225, 224, 204, 0.8)", transition: "color 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
