import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const navigationLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Support", href: "/support" },
    { name: "Our Services", href: "/services" },
    { name: "Blog Updates", href: "/blog" },
    { name: "Customer Reviews", href: "/reviews" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Settings", href: "#cookies" }
  ];

  return (
    <footer className='border-t mt-20'>
      <div className='max-w-6xl mx-auto px-4 py-6'>
        {/* Main Footer Content */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-6'>
          {/* Logo */}
          <Link href='/' className='font-semibold text-xl italic'>
            Logo
          </Link>

          {/* Navigation Links */}
          <nav className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                  aria-label={social.name}
                >
                  <Icon className='h-4 w-4' />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
          <p>© 2024 Ajax Systems. All rights reserved.</p>

          <div className='flex flex-wrap justify-center gap-6'>
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='hover:text-foreground transition-colors'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
