import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'PortfolioPro | Simphiwe Tebogo Morare - Enterprise IT Technical Support',
  description: 'Recruiter-focused portfolio of Simphiwe Tebogo Morare, showcasing 5+ years of ITIL service desk operations, Active Directory administration, Azure AD, and enterprise desktop support.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#0B0F17] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
