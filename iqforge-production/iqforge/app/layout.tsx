import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'IQForge — Measure how you think',description:'An adaptive cognitive assessment that maps reasoning strengths, weaknesses and problem-solving patterns.',openGraph:{title:'IQForge — Measure how you think',description:'Adaptive cognitive assessment with deterministic scoring and AI interpretation',type:'website'},twitter:{card:'summary_large_image',title:'IQForge — Measure how you think',description:'Adaptive cognitive assessment'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
