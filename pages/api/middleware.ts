import { NextResponse, type NextRequest } from 'next/server'
import Cors from '~/api/middleware/Cors'

export function middleware(request: NextRequest) {
    Cors(request) // Enable CORS

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/*'],
}
