import { NextResponse, type NextRequest } from 'next/server'

export default function Authorization(request: NextRequest) {
    const authorization = request.headers.get('Authorization')

    // Se você precisar validar o token, faça isso aqui
    if (!authorization) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Caso a requisição esteja autorizada, permita a continuidade
    return NextResponse.next()
}
