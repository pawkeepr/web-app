import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Cors(request) // Enable CORS
    // Authorization(request) // Check Authorization header

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}
