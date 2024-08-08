import { NextResponse, type NextRequest } from 'next/server'

export default function Authorization(request: NextRequest) {
    // Caso a requisição esteja autorizada, permita a continuidade
    return NextResponse.next()
}
