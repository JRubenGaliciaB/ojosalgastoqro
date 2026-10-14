import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Ojos al gasto Qro | El presupuesto, a la vista',description:'Explora y compara el presupuesto de egresos de Querétaro 2021–2026. Datos, dependencias e históricos en un solo lugar.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
