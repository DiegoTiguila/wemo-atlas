import type { Metadata } from 'next';
import './globals.css';
import Shell from '@/components/Shell';
import project from '@/data/project.json';
export const metadata: Metadata = { title: `${project.name} — Atlas financiero`, description:`Atlas financiero de ${project.name} (${project.signature}), estudio creativo de VFX, animación y producción digital.` };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><Shell>{children}</Shell></body></html>}
