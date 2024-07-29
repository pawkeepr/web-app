import { NextResponse, type NextRequest } from 'next/server'
import Authorization from '~/api/middleware/Authorization'
import Cors from '~/api/middleware/Cors'

export function middleware(request: NextRequest) {
    Cors(request) // Enable CORS
    Authorization(request) // Check Authorization header

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}
