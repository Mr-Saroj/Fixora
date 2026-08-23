import React from 'react';
import {
  platformLinks,
  legalLinks,
  socialLinks,
} from '../../utils/footerUtils';

const Footer = () => {
  return (
    <footer
      id="support"
      className="relative bg-[#0B1120] w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

      <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute bottom-10 -right-40 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-[1280px] mx-auto px-6 pt-6 pb-2 md:pt-16 md:pb-10"></div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

        {/* Brand Section */}
        <div className="col-span-1 sm:col-span-2 space-y-4 md:space-y-6">
          <a
            href="/"
            className="inline-block hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-28 md:w-36 h-auto"
              viewBox="0 0 200 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="footer-logo-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: '#2563EB',
                      stopOpacity: 1,
                    }}
                  />

                  <stop
                    offset="100%"
                    style={{
                      stopColor: '#06B6D4',
                      stopOpacity: 1,
                    }}
                  />
                </linearGradient>
              </defs>

              <g transform="translate(0, 10)">
                <path
                  d="M10 0 C10 0 40 0 40 5 C40 10 20 12 20 15 L20 25 L35 25 C35 25 35 30 30 30 L20 30 L20 45 L10 45 L10 0"
                  fill="url(#footer-logo-grad)"
                />

                <circle
                  cx="45"
                  cy="5"
                  r="5"
                  fill="#10B981"
                />

                <text
                  x="65"
                  y="35"
                  fontFamily="Inter, sans-serif"
                  fontWeight="800"
                  fontSize="32"
                  fill="#FFFFFF"
                >
                  Fixora
                </text>
              </g>
            </svg>
          </a>

          <p className="text-[#64748B] max-w-sm text-[13px] md:text-[15px] leading-relaxed">
            The platform of choice for discerning homeowners and elite service
            professionals. Built on trust, driven by precision.
          </p>

          {/* Social Links */}
          <div className="flex space-x-3 pt-1 md:pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                className="group/social relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#64748B] hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                href="#"
                title={social.label}
              >
                <span className="material-symbols-outlined text-[18px] md:text-[20px] group-hover/social:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>

                <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white bg-[#1E293B] border border-white/10 px-2.5 py-1 rounded-lg opacity-0 group-hover/social:opacity-100 translate-y-2 group-hover/social:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Platform Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 md:mb-6">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[13px] md:text-[14px]">
                widgets
              </span>
            </div>

            <h4 className="font-bold text-[15px] md:text-[16px] text-white">
              Platform
            </h4>
          </div>

          <ul className="space-y-0.5 md:space-y-1">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group/link flex items-center gap-2 md:gap-3 text-[#64748B] hover:text-white text-[13px] md:text-[14px] py-1.5 md:py-2 px-2 md:px-3 -mx-2 md:-mx-3 rounded-lg hover:bg-white/[0.03] transition-all duration-200"
                  href={link.href}
                >
                  <span className="material-symbols-outlined text-[16px] md:text-[18px] text-[#475569] group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all duration-200">
                    {link.icon}
                  </span>

                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>

                  <span className="material-symbols-outlined text-[14px] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-primary transition-all duration-200">
                    arrow_forward
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 md:mb-6">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-400 text-[13px] md:text-[14px]">
                gavel
              </span>
            </div>

            <h4 className="font-bold text-[15px] md:text-[16px] text-white">
              Legal
            </h4>
          </div>

          <ul className="space-y-0.5 md:space-y-1">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="group/link flex items-center gap-2 md:gap-3 text-[#64748B] hover:text-white text-[13px] md:text-[14px] py-1.5 md:py-2 px-2 md:px-3 -mx-2 md:-mx-3 rounded-lg hover:bg-white/[0.03] transition-all duration-200"
                  href={link.href}
                >
                  <span className="material-symbols-outlined text-[16px] md:text-[18px] text-[#475569] group-hover/link:text-emerald-400 group-hover/link:translate-x-0.5 transition-all duration-200">
                    {link.icon}
                  </span>

                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>

                  <span className="material-symbols-outlined text-[14px] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-emerald-400 transition-all duration-200">
                    arrow_forward
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="border-t border-white/[0.06]"></div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1280px] mx-auto px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#475569]">
          <span className="material-symbols-outlined text-[13px] md:text-[14px]">
            copyright
          </span>

          <span>
            2024 Fixora AI. Precision Service Delivery.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;