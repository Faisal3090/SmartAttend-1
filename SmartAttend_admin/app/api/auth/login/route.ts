import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { getUserByEmail, verifyPassword } from '@/lib/db'
import { createSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Supported administrative accounts
    const validUsers: Record<string, { name: string; role: string; password: string }> = {
      'admin@smartattend.edu': { name: 'System Administrator', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@smartattend.edu.in': { name: 'Anita Kulkarni', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin': { name: 'Admin User', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@cse': { name: 'CSE Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@ec': { name: 'ECE Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@eee': { name: 'EEE Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@cv': { name: 'Civil Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@me': { name: 'Mechanical Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@aiml': { name: 'AIML Admin', role: 'SUPER_ADMIN', password: 'admin123' },
      'admin@ds': { name: 'Data Science Admin', role: 'SUPER_ADMIN', password: 'admin123' },
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const userMatch = validUsers[normalizedEmail]

    if (!userMatch || userMatch.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username/email or password' },
        { status: 401 }
      )
    }

    // Create session cookie
    await createSession({
      userId: `usr_${Date.now()}`,
      email: normalizedEmail,
      name: userMatch.name,
      role: userMatch.role,
    })

    return NextResponse.json({ success: true, redirect: '/admin/dashboard' })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
