import Image from 'next/image';
import Link from 'next/link';

export function UniversityLogo({ className = '', variant = 'dark', href = '/' }: { className?: string; variant?: 'dark' | 'light'; href?: string }) {
  const isLight = variant === 'light';
  return (
    <Link href={href} className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-[52px] h-[52px] flex-shrink-0 bg-white rounded-full overflow-hidden flex items-center justify-center border border-slate-200">
        <Image
          src="/logo.png"
          alt="EU American University Logo"
          fill
          className="object-contain p-1"
          sizes="52px"
          priority
        />
      </div>
      <div className="flex flex-col justify-center -mt-0.5">
        <span className={`font-heading font-extrabold text-[17.5px] tracking-wide leading-tight uppercase ${isLight ? 'text-white' : 'text-[#1e3a8a]'}`}>
          EU AMERICAN
        </span>
        <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${isLight ? 'text-white/70' : 'text-[#476793]'} leading-none mt-0.5`}>
          UNIVERSITY
        </span>
      </div>
    </Link>
  );
}
