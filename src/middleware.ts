import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
 
export default createMiddleware(routing);
// 測試middleware是否作用
// const inmiddleware = createMiddleware(routing);
// export default function customMiddleware(req: any) {
//   console.log("這裡是middleware")
//   console.log('🔥 Middleware triggered at:', req.nextUrl.pathname);
//   return inmiddleware(req);
// }

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  // matcher: '/((?!api|_next|.*\\..*).*)'
}