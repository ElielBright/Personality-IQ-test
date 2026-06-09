const Logo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    {/* Brain shape */}
    <path
      d="M16 2C9 2 4 7 4 14c0 3.5 1.5 6.5 4 8.5V28a2 2 0 002 2h12a2 2 0 002-2v-5.5c2.5-2 4-5 4-8.5C28 7 23 2 16 2z"
      fill="#4f46e5"
      opacity="0.12"
    />
    {/* Left hemisphere */}
    <path
      d="M16 6C11 6 7 10 7 15c0 2.5 1 4.8 2.8 6.5l.2.2V25a1 1 0 001 1h2v-2.5"
      stroke="#4f46e5"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right hemisphere */}
    <path
      d="M16 6c5 0 9 4 9 9 0 2.5-1 4.8-2.8 6.5l-.2.2V25a1 1 0 01-1 1h-2v-2.5"
      stroke="#4f46e5"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Center line */}
    <line x1="16" y1="6" x2="16" y2="23" stroke="#4f46e5" strokeWidth="1.4" opacity="0.4" />
    {/* Data/metric dots on left */}
    <circle cx="11" cy="12" r="1.2" fill="#4f46e5" opacity="0.6" />
    <circle cx="13" cy="15" r="1" fill="#4f46e5" opacity="0.4" />
    <circle cx="10" cy="17" r="0.8" fill="#4f46e5" opacity="0.5" />
    <circle cx="12" cy="10" r="0.7" fill="#7c3aed" opacity="0.5" />
    {/* Data/metric dots on right */}
    <circle cx="21" cy="12" r="1.2" fill="#4f46e5" opacity="0.6" />
    <circle cx="19" cy="15" r="1" fill="#4f46e5" opacity="0.4" />
    <circle cx="22" cy="17" r="0.8" fill="#4f46e5" opacity="0.5" />
    <circle cx="20" cy="10" r="0.7" fill="#7c3aed" opacity="0.5" />
    {/* Center dot */}
    <circle cx="16" cy="9" r="1.5" fill="#4f46e5" />
  </svg>
);

export default Logo;
