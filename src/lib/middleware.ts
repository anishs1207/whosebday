// // If the User Session persists redirect the to the dashbaord route direclty


// import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";


// // write all the routes here where the logic is applicable
// export const config = {
//     matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
// };

// export async function checkSessionMiddleware (request: NextRequest) {
//     const token = await getToken ({req: request});
//     // to get the jwt token of the uset=r to check their session 8 Auth
//     const url = request.nextUrl;
//     //get the current url the user is on

//     const startsWith =  url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') ||
//     url.pathname.startsWith('/verify') ||
//     url.pathname === '/'

//     if (token && startsWith) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }

//     if (!token && url.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL('/sign-in', request.url));
//     }

//     return NextResponse.next();
// }