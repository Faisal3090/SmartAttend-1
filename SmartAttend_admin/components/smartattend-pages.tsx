'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  ClipboardList,
  SlidersHorizontal,
  BarChart3,
  UserCog,
  Settings,
  ArrowRight,
  Shield,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Download,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react'
import { AdminShell, AdminContent, StatusBadge, Label, Inp } from './admin-shell'

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const stats = [
  { label: 'Total Students', value: '2,856', icon: GraduationCap, sub: '+48 this semester', accent: false },
  { label: 'Total Faculty', value: '156', icon: Users, sub: '12 departments', accent: false },
  { label: 'Active Classes', value: '128', icon: ClipboardList, sub: 'This week', accent: false },
  { label: 'Avg. Attendance', value: '82%', icon: SlidersHorizontal, sub: 'Current semester', accent: true },
]

const quickActions = [
  { title: 'Student Management', href: '/admin/students', icon: GraduationCap, desc: 'Manage student records' },
  { title: 'Faculty Management', href: '/admin/faculty', icon: Users, desc: 'Manage faculty profiles' },
  { title: 'Timetable Management', href: '/admin/timetable', icon: ClipboardList, desc: 'Plan and manage classes' },
  { title: 'Attendance Overview', href: '/admin/reports', icon: SlidersHorizontal, desc: 'View attendance data' },
  { title: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, desc: 'View institutional reports' },
  { title: 'Users & Roles', href: '/admin/users', icon: UserCog, desc: 'Manage system users' },
  { title: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList, desc: 'Track admin activity' },
  { title: 'System Settings', href: '/admin/settings', icon: Settings, desc: 'Configure your console' },
]

export function DashboardPage() {
  return (
    <AdminShell>
      <AdminContent>
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your institution&apos;s activity today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className={`rounded-xl border p-6 shadow-sm ${item.accent ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-card-foreground border-border'}`}>
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className={`tracking-tight text-sm font-medium ${item.accent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{item.label}</h3>
                    <Icon className={`h-4 w-4 ${item.accent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-3xl font-bold">{item.value}</div>
                    <p className={`text-xs ${item.accent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground tracking-tight">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map(action => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-foreground/30 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{action.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{action.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      Open <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Students Page ────────────────────────────────────────────────────────────
interface Student {
  name: string
  usn: string
  dept: string
  year: string
  semester: string
  section: string
  account: string
  device: string
  email?: string
  password?: string | null
}

const students: Student[] = [
  // 1st Year - 1st Sem
  { name: 'Aditi Sharma', usn: '01CS101', dept: 'CSE', year: '1st Year', semester: '1st Sem', section: 'CSE 1A', account: 'Active', device: 'Not Linked' },
  { name: 'Aryan Mehta', usn: '01CS102', dept: 'CSE', year: '1st Year', semester: '1st Sem', section: 'CSE 1B', account: 'Active', device: 'Linked' },
  { name: 'Tanvi Rao', usn: '01CS103', dept: 'CSE', year: '1st Year', semester: '1st Sem', section: 'CSE 1A', account: 'Active', device: 'Linked' },
  // 1st Year - 2nd Sem
  { name: 'Harsh Gupta', usn: '01CS104', dept: 'CSE', year: '1st Year', semester: '2nd Sem', section: 'CSE 1A', account: 'Active', device: 'Not Linked' },
  { name: 'Sneha Roy', usn: '01CS105', dept: 'CSE', year: '1st Year', semester: '2nd Sem', section: 'CSE 1B', account: 'Active', device: 'Linked' },
  { name: 'Rohan Verma', usn: '01CS106', dept: 'CSE', year: '1st Year', semester: '2nd Sem', section: 'CSE 1B', account: 'Inactive', device: 'Not Linked' },

  // 2nd Year - 3rd Sem
  { name: 'Kavya Nair', usn: '01CS201', dept: 'CSE', year: '2nd Year', semester: '3rd Sem', section: 'CSE 2A', account: 'Active', device: 'Linked' },
  { name: 'Manish Joshi', usn: '01CS202', dept: 'CSE', year: '2nd Year', semester: '3rd Sem', section: 'CSE 2B', account: 'Active', device: 'Not Linked' },
  { name: 'Ishita Rao', usn: '01EC203', dept: 'ECE', year: '2nd Year', semester: '3rd Sem', section: 'ECE 2A', account: 'Active', device: 'Linked' },
  // 2nd Year - 4th Sem
  { name: 'Amitabh Sen', usn: '01CS204', dept: 'CSE', year: '2nd Year', semester: '4th Sem', section: 'CSE 2A', account: 'Active', device: 'Linked' },
  { name: 'Deepa Verma', usn: '01CS205', dept: 'CSE', year: '2nd Year', semester: '4th Sem', section: 'CSE 2B', account: 'Active', device: 'Not Linked' },

  // 3rd Year - 5th Sem
  { name: 'Rahul Sharma', usn: '01CS123', dept: 'CSE', year: '3rd Year', semester: '5th Sem', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Ananya Singh', usn: '01CS124', dept: 'CSE', year: '3rd Year', semester: '5th Sem', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Arjun Kumar', usn: '01CS127', dept: 'CSE', year: '3rd Year', semester: '5th Sem', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Vikram Patel', usn: '01CS125', dept: 'CSE', year: '3rd Year', semester: '5th Sem', section: 'CSE 3B', account: 'Active', device: 'Linked' },
  { name: 'Neha Verma', usn: '01CS126', dept: 'CSE', year: '3rd Year', semester: '5th Sem', section: 'CSE 3B', account: 'Inactive', device: 'Not Linked' },
  // 3rd Year - 6th Sem
  { name: 'Siddharth Rao', usn: '01CS301', dept: 'CSE', year: '3rd Year', semester: '6th Sem', section: 'CSE 3A', account: 'Active', device: 'Linked' },
  { name: 'Tanvi Kadam', usn: '01CS302', dept: 'CSE', year: '3rd Year', semester: '6th Sem', section: 'CSE 3B', account: 'Active', device: 'Linked' },
  { name: 'Karan Shah', usn: '01IT118', dept: 'IT', year: '3rd Year', semester: '6th Sem', section: 'IT 3A', account: 'Active', device: 'Not Linked' },

  // 4th Year - 7th Sem
  { name: 'Priya Gupta', usn: '01CS401', dept: 'CSE', year: '4th Year', semester: '7th Sem', section: 'CSE 4A', account: 'Active', device: 'Linked' },
  { name: 'Sanjay Reddy', usn: '01CS402', dept: 'CSE', year: '4th Year', semester: '7th Sem', section: 'CSE 4A', account: 'Active', device: 'Linked' },
  { name: 'Divya Nair', usn: '01CS403', dept: 'CSE', year: '4th Year', semester: '7th Sem', section: 'CSE 4B', account: 'Active', device: 'Linked' },
  { name: 'Rohan Kapoor', usn: '01CS404', dept: 'CSE', year: '4th Year', semester: '7th Sem', section: 'CSE 4B', account: 'Active', device: 'Not Linked' },
  // 4th Year - 8th Sem
  { name: 'Gautam Bose', usn: '01CS405', dept: 'CSE', year: '4th Year', semester: '8th Sem', section: 'CSE 4A', account: 'Active', device: 'Linked' },
  { name: 'Meera Iyer', usn: '01CS406', dept: 'CSE', year: '4th Year', semester: '8th Sem', section: 'CSE 4B', account: 'Active', device: 'Linked' },

  // --- Other Departments Mock Data ---
  // ECE (EC)
  { name: 'Neha Sharma', usn: '01EC101', dept: 'ECE', year: '1st Year', semester: '1st Sem', section: 'ECE 1A', account: 'Active', device: 'Linked' },
  { name: 'Varun Reddy', usn: '01EC301', dept: 'ECE', year: '3rd Year', semester: '5th Sem', section: 'ECE 3A', account: 'Active', device: 'Not Linked' },
  // Mechanical (ME)
  { name: 'Kiran Desai', usn: '01ME201', dept: 'ME', year: '2nd Year', semester: '3rd Sem', section: 'ME 2A', account: 'Active', device: 'Linked' },
  { name: 'Anil Kumar', usn: '01ME401', dept: 'ME', year: '4th Year', semester: '7th Sem', section: 'ME 4A', account: 'Inactive', device: 'Not Linked' },
  // Data Science (DS)
  { name: 'Sneha Joshi', usn: '01DS101', dept: 'DS', year: '1st Year', semester: '2nd Sem', section: 'DS 1A', account: 'Active', device: 'Linked' },
  { name: 'Amit Patel', usn: '01DS301', dept: 'DS', year: '3rd Year', semester: '6th Sem', section: 'DS 3A', account: 'Active', device: 'Linked' },
  // EEE
  { name: 'Riya Singh', usn: '01EE201', dept: 'EEE', year: '2nd Year', semester: '4th Sem', section: 'EEE 2A', account: 'Active', device: 'Linked' },
  { name: 'Gaurav Das', usn: '01EE401', dept: 'EEE', year: '4th Year', semester: '8th Sem', section: 'EEE 4A', account: 'Active', device: 'Not Linked' },
  // Civil (CV)
  { name: 'Pooja Verma', usn: '01CV101', dept: 'CV', year: '1st Year', semester: '1st Sem', section: 'CV 1A', account: 'Active', device: 'Linked' },
  { name: 'Deepak Raj', usn: '01CV301', dept: 'CV', year: '3rd Year', semester: '5th Sem', section: 'CV 3A', account: 'Active', device: 'Linked' },
]

const DEFAULT_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

const YEAR_SEMESTERS: Record<string, string[]> = {
  '1st Year': ['1st Sem', '2nd Sem'],
  '2nd Year': ['3rd Sem', '4th Sem'],
  '3rd Year': ['5th Sem', '6th Sem'],
  '4th Year': ['7th Sem', '8th Sem'],
}

// Map semester label to its number (1-8)
const SEM_LABEL_TO_NUM: Record<string, number> = {
  '1st Sem': 1, '2nd Sem': 2, '3rd Sem': 3, '4th Sem': 4,
  '5th Sem': 5, '6th Sem': 6, '7th Sem': 7, '8th Sem': 8,
}
const SEM_NUM_TO_LABEL: Record<number, string> = {
  1: '1st Sem', 2: '2nd Sem', 3: '3rd Sem', 4: '4th Sem',
  5: '5th Sem', 6: '6th Sem', 7: '7th Sem', 8: '8th Sem',
}
const YEAR_NUM_TO_LABEL: Record<number, string> = {
  1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year',
}

export function StudentsPage({ adminDept = 'CSE' }: { adminDept?: string }) {
  const [query, setQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedSem, setSelectedSem] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>('ALL')
  const [openYearDropdown, setOpenYearDropdown] = useState<string | null>(null)
  const [students_data, setStudentsData] = useState<Student[]>(students)

  // Active semester type — tracked per year, persisted in localStorage
  const [activeSemTypes, setActiveSemTypes] = React.useState<Record<string, 'odd' | 'even'>>({
    '1st Year': 'odd', '2nd Year': 'odd', '3rd Year': 'odd', '4th Year': 'odd'
  })

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smartattend_active_sem_types')
      if (saved) {
        try {
          setActiveSemTypes(JSON.parse(saved))
          return
        } catch (e) { }
      }
      // Default: derive from current month
      const month = new Date().getMonth() + 1
      const defaultType = month >= 7 ? 'odd' : 'even'
      setActiveSemTypes({
        '1st Year': defaultType, '2nd Year': defaultType, '3rd Year': defaultType, '4th Year': defaultType
      })
    }
  }, [])

  const toggleActiveSemType = (year: string) => {
    setActiveSemTypes(prev => {
      const next = { ...prev, [year]: prev[year] === 'odd' ? 'even' : 'odd' }
      if (typeof window !== 'undefined') localStorage.setItem('smartattend_active_sem_types', JSON.stringify(next))
      return next
    })
  }

  const isSemActive = (year: string, semLabel: string): boolean => {
    const num = SEM_LABEL_TO_NUM[semLabel]
    if (!num) return false
    const type = activeSemTypes[year] || 'odd'
    return type === 'odd' ? num % 2 === 1 : num % 2 === 0
  }

  // Bulk Promote modal state
  const [showBulkPromoteModal, setShowBulkPromoteModal] = React.useState(false)

  // Execute bulk promotion: move all students in selectedYear+selectedSem → next sem
  const confirmBulkPromote = () => {
    if (!selectedYear || !selectedSem) return
    const currentNum = SEM_LABEL_TO_NUM[selectedSem] || 1
    const nextNum = currentNum + 1
    if (nextNum > 8) { setShowBulkPromoteModal(false); return }
    const nextSemLabel = SEM_NUM_TO_LABEL[nextNum]
    const nextYearNum = Math.ceil(nextNum / 2)
    const nextYearLabel = YEAR_NUM_TO_LABEL[nextYearNum] || selectedYear
    
    setStudentsData(prev => prev.map(s => {
      if (s.year !== selectedYear || s.semester !== selectedSem) return s
      const newSection = s.section.replace(/\d/, String(nextYearNum))
      return { ...s, semester: nextSemLabel, year: nextYearLabel, section: newSection }
    }))
    
    // Update active sem types
    setActiveSemTypes(prev => {
      const next = { ...prev }
      const isNextSemEven = nextNum % 2 === 0
      next[nextYearLabel] = isNextSemEven ? 'even' : 'odd'
      if (selectedYear !== nextYearLabel) {
        // If they moved to a new year, reset the old year to 'odd' for incoming students
        next[selectedYear] = 'odd'
      }
      if (typeof window !== 'undefined') localStorage.setItem('smartattend_active_sem_types', JSON.stringify(next))
      return next
    })
    
    setShowBulkPromoteModal(false)
    setSelectedSem(null)
    setSelectedYear(null)
    setSelectedSection('ALL')
  }

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCredentialsModal, setShowCredentialsModal] = useState(false)
  const [studentToEdit, setStudentToEdit] = useState<any>(null)
  const [studentToDelete, setStudentToDelete] = useState<any>(null)
  const [newStudentPassword, setNewStudentPassword] = useState('')
  const [selectedStudentForCredentials, setSelectedStudentForCredentials] = useState<any>(null)
  const [lastAddedStudent, setLastAddedStudent] = useState<Student | null>(null)

  // Form state & validation errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    year: '',
    semester: '',
    section: '',
    account: 'Inactive',
    device: 'Not Linked',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // adminDept is now passed as a prop, defaults to 'CSE' if not provided
  // (handled in component signature)
  // Helper to safely extract value from either string or ChangeEvent
  const updateFormField = (field: string, valOrEvent: any) => {
    const value = valOrEvent && typeof valOrEvent === 'object' && 'target' in valOrEvent
      ? valOrEvent.target.value
      : (typeof valOrEvent === 'string' ? valOrEvent : '')
    setFormData(prev => ({ ...prev, [field]: value }))
    setFormErrors(prev => {
      if (!prev[field]) return prev
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
  }

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  // Helper to get available sections for any year and semester
  const getSectionsForYearAndSem = (year: string, sem: string) => {
    if (!year) return []
    const fromData = students_data
      .filter(s => s.year === year && (!sem || s.semester === sem) && (adminDept === 'ALL' || s.dept === adminDept))
      .map(s => s.section)
    const yearNum = year.match(/\d/)?.[0] || '1'
    const defaults = [`${adminDept} ${yearNum}A`, `${adminDept} ${yearNum}B`]
    return Array.from(new Set([...defaults, ...fromData])).sort()
  }

  // Get unique years from default list and data
  const years = useMemo(() => {
    const dataYears = students_data.map(s => s.year)
    return Array.from(new Set([...DEFAULT_YEARS, ...dataYears])).sort((a, b) => {
      const numA = parseInt(a) || 0
      const numB = parseInt(b) || 0
      return numA - numB
    })
  }, [students_data])

  // Get sections for current selected year & semester
  const sectionsForCurrentSem = useMemo(() => {
    if (!selectedYear || !selectedSem) return []
    return getSectionsForYearAndSem(selectedYear, selectedSem)
  }, [selectedYear, selectedSem, students_data, adminDept])

  const filtered = useMemo(() => {
    let result = students_data.filter(s => (adminDept === 'ALL' || s.dept === adminDept))
    if (selectedYear) {
      result = result.filter(s => s.year === selectedYear)
    }
    if (selectedSem) {
      result = result.filter(s => s.semester === selectedSem)
    }
    if (selectedSection && selectedSection !== 'ALL') {
      result = result.filter(s => s.section === selectedSection)
    }

    return result.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.usn.toLowerCase().includes(query.toLowerCase()) ||
      s.section.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, selectedYear, selectedSem, selectedSection, students_data, adminDept])

  // Add Student
  const handleAddStudent = () => {
    const targetYear = formData.year || selectedYear || ''
    const targetSem = formData.semester || selectedSem || ''
    const targetSection = (formData.section || (selectedSection !== 'ALL' ? selectedSection : sectionsForCurrentSem[0]) || '').trim()

    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Student name is required'
    if (!formData.usn.trim()) errors.usn = 'USN (Register Number) is required'
    if (!targetYear) errors.year = 'Academic year is missing'
    if (!targetSem) errors.semester = 'Semester is missing'
    if (!targetSection) errors.section = 'Section is missing'

    const cleanUsn = formData.usn.trim().toUpperCase()
    if (students_data.some(s => s.usn.toUpperCase() === cleanUsn)) {
      errors.usn = 'A student with this USN already exists'
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Only generate password if account is Active
    const password = formData.account === 'Active' ? generatePassword() : null
    const newStudent: Student = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      usn: cleanUsn,
      dept: adminDept,
      year: targetYear,
      semester: targetSem,
      section: targetSection,
      account: formData.account,
      device: 'Not Linked',
      password: password,
    }

    setStudentsData(prev => [...prev, newStudent])
    setLastAddedStudent(newStudent)
    setNewStudentPassword(password || '')
    setShowAddModal(false)
    setShowSuccessModal(true)

    // Navigate to the newly added student's year, semester, and section
    setSelectedYear(newStudent.year)
    setSelectedSem(newStudent.semester)
    setSelectedSection(newStudent.section)

    setFormData({ name: '', email: '', usn: '', year: '', semester: '', section: '', account: 'Inactive', device: 'Not Linked', password: '' })
    setFormErrors({})
  }

  // Edit Student
  const handleEditStudent = () => {
    if (!studentToEdit) return

    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Student name is required'
    if (!formData.usn.trim()) errors.usn = 'USN is required'
    if (!formData.year) errors.year = 'Please select an academic year'
    if (!formData.semester) errors.semester = 'Please select a semester'
    if (!formData.section.trim()) errors.section = 'Please specify a section'

    const cleanUsn = formData.usn.trim().toUpperCase()
    if (students_data.some(s => s.usn !== studentToEdit.usn && s.usn.toUpperCase() === cleanUsn)) {
      errors.usn = 'Another student with this USN already exists'
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const targetYear = formData.year
    const targetSem = formData.semester
    const targetSection = formData.section.trim()

    const updated = students_data.map(s =>
      s.usn === studentToEdit.usn
        ? {
          ...s,
          name: formData.name.trim(),
          email: formData.email.trim(),
          usn: cleanUsn,
          year: targetYear,
          semester: targetSem,
          section: targetSection,
          account: formData.account,
          device: formData.device,
          password: formData.account === 'Active' && !s.password ? generatePassword() : (formData.account === 'Inactive' ? null : s.password)
        }
        : s
    )

    setStudentsData(updated)
    setShowEditModal(false)
    setStudentToEdit(null)

    // Redirect view to the student's updated semester and section
    setSelectedYear(targetYear)
    setSelectedSem(targetSem)
    setSelectedSection(targetSection)

    setFormData({ name: '', email: '', usn: '', year: '', semester: '', section: '', account: 'Inactive', device: 'Not Linked', password: '' })
    setFormErrors({})
  }

  // Delete Student
  const handleDeleteStudent = () => {
    if (!studentToDelete) return
    const updated = students_data.filter(s => s.usn !== studentToDelete.usn)
    setStudentsData(updated)
    setShowDeleteConfirm(false)
    setStudentToDelete(null)
  }

  const openEditModal = (student: Student) => {
    setStudentToEdit(student)
    setFormData({
      name: student.name,
      email: student.email || '',
      usn: student.usn,
      year: student.year,
      semester: student.semester || (YEAR_SEMESTERS[student.year]?.[0] || '1st Sem'),
      section: student.section,
      account: student.account,
      device: student.device,
      password: student.password || '',
    })
    setFormErrors({})
    setShowEditModal(true)
  }

  const openDeleteConfirm = (student: any) => {
    setStudentToDelete(student)
    setShowDeleteConfirm(true)
  }

  const openCredentialsModal = (student: any) => {
    setSelectedStudentForCredentials(student)
    setShowCredentialsModal(true)
  }

  return (
    <AdminShell>
      <AdminContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Students</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage student directory, devices, and accounts.</p>
            </div>
          </div>

          {/* Level 1: Year Selection Cards with Semester Dropdowns */}
          {!selectedSem && (
            <div className="space-y-4">
              {/* Department Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-sm">
                  Department: {adminDept}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Select Year to View Semesters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative">
                  {years.map(year => {
                    const sems = YEAR_SEMESTERS[year] || []
                    const totalYearStudents = students_data.filter(s => s.year === year && (adminDept === 'ALL' || s.dept === adminDept)).length
                    const isOpen = openYearDropdown === year
                    // Find the active semester for this year
                    const activeSemLabel = sems.find(s => isSemActive(year, s))
                    const activeSemCount = activeSemLabel
                      ? students_data.filter(s => s.year === year && s.semester === activeSemLabel && (adminDept === 'ALL' || s.dept === adminDept)).length
                      : 0

                    return (
                      <div key={year} className="relative flex flex-col gap-2">
                        {/* Year Header Button */}
                        <button
                          type="button"
                          onClick={() => setOpenYearDropdown(isOpen ? null : year)}
                          className={`w-full p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all bg-card ${
                            isOpen ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border hover:border-primary/60 shadow-sm'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-foreground text-base">{year}</div>
                            <div className="text-xs font-medium text-muted-foreground mt-1">
                              <span className="text-foreground font-bold">{activeSemCount} active</span> · {totalYearStudents} total
                            </div>
                          </div>
                          <div className={`p-1.5 rounded-md transition-all duration-200 ${isOpen ? 'rotate-180 bg-primary text-primary-foreground' : 'text-muted-foreground bg-muted'}`}>
                            <ChevronDown className="size-4" />
                          </div>
                        </button>



                        {/* Floating Semester Dropdown */}
                        {isOpen && (
                          <>
                            <div className="fixed inset-0 z-20" onClick={() => setOpenYearDropdown(null)} />
                            <div className="absolute left-0 right-0 top-[calc(100%+44px)] z-30 bg-card rounded-xl border border-border shadow-xl p-2.5 space-y-1.5 animate-in fade-in-50 zoom-in-95">
                              <div className="flex items-center justify-between px-2 py-1 mb-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                  Select Semester
                                </span>
                                <div className="flex items-center bg-muted/50 p-0.5 rounded-md border border-border/50">
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); if (activeSemTypes[year] === 'even') toggleActiveSemType(year); }}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                                      (!activeSemTypes[year] || activeSemTypes[year] === 'odd')
                                        ? 'bg-background text-foreground shadow-sm ring-1 ring-border/50'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                  >
                                    Odd
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); if (!activeSemTypes[year] || activeSemTypes[year] === 'odd') toggleActiveSemType(year); }}
                                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                                      activeSemTypes[year] === 'even'
                                        ? 'bg-background text-foreground shadow-sm ring-1 ring-border/50'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                  >
                                    Even
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {sems.map(sem => {
                                  const semStudents = students_data.filter(
                                    s => s.year === year && s.semester === sem && (adminDept === 'ALL' || s.dept === adminDept)
                                  ).length
                                  const active = isSemActive(year, sem)
                                  return (
                                    <button
                                      key={sem}
                                      type="button"
                                      disabled={!active}
                                      onClick={() => {
                                        if (!active) return
                                        setSelectedYear(year)
                                        setSelectedSem(sem)
                                        setSelectedSection('ALL')
                                        setOpenYearDropdown(null)
                                      }}
                                      className={`w-full p-2.5 rounded-lg border transition-all text-left flex items-center justify-between ${
                                        active
                                          ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 cursor-pointer'
                                          : 'border-border bg-muted/50 cursor-not-allowed opacity-60 grayscale'
                                      }`}
                                    >
                                      <div>
                                        <div className="font-bold text-sm text-foreground flex items-center gap-2">
                                          {sem}
                                          {active
                                            ? <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">Active</span>
                                            : <span className="text-[10px] bg-muted-foreground text-white px-1.5 py-0.5 rounded-full">Inactive</span>
                                          }
                                        </div>
                                        {active
                                          ? <div className="text-[11px] text-muted-foreground mt-0.5">{semStudents} students</div>
                                          : <div className="text-[11px] text-muted-foreground mt-0.5">Currently {(activeSemTypes[year] || 'odd') === 'odd' ? 'Odd' : 'Even'} Semester is ongoing</div>
                                        }
                                      </div>
                                      {active && (
                                        <span className="text-xs font-bold text-blue-600">→</span>
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Level 2: Semester & Section View with Table */}
          {selectedSem && (
            <div className="space-y-4">
              {/* Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSem(null)
                      setSelectedSection('ALL')
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <ArrowLeft className="size-4" />
                    Back to Years
                  </button>
                  <span className="text-muted-foreground">|</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{selectedYear}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary">
                      {selectedSem}
                    </span>
                  </div>
                </div>

                {/* Quick Semester Toggle Pills */}
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border self-start sm:self-auto">
                  {(YEAR_SEMESTERS[selectedYear || ''] || []).map(sem => (
                    <button
                      key={sem}
                      onClick={() => {
                        setSelectedSem(sem)
                        setSelectedSection('ALL')
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        selectedSem === sem
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Selector Part of that Semester */}
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Sections in {selectedSem} ({selectedYear})
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Click a section to view its students, or view All Sections.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Active: <strong className="text-foreground">{selectedSection === 'ALL' ? 'All Sections' : selectedSection}</strong> ({filtered.length} students)
                  </span>
                </div>

                {/* Section Buttons / Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedSection('ALL')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSection === 'ALL'
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-background hover:bg-accent text-foreground border-input'
                    }`}
                  >
                    All Sections ({students_data.filter(s => s.year === selectedYear && s.semester === selectedSem && (adminDept === 'ALL' || s.dept === adminDept)).length})
                  </button>

                  {sectionsForCurrentSem.map(sec => {
                    const secCount = students_data.filter(
                      s => s.year === selectedYear && s.semester === selectedSem && s.section === sec && (adminDept === 'ALL' || s.dept === adminDept)
                    ).length
                    const isSelected = selectedSection === sec

                    return (
                      <button
                        key={sec}
                        onClick={() => setSelectedSection(sec)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                            : 'bg-background hover:bg-accent text-foreground border-input'
                        }`}
                      >
                        <span>{sec}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {secCount}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Table of Students in that Semester & Section */}
              <div className="rounded-xl border border-border bg-card shadow-sm">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={`Search ${selectedSem} students...`}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <button className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </button>
                    {/* Bulk Promote — only for active semester, and not for 8th sem */}
                    {isSemActive(selectedYear || '', selectedSem || '') && selectedSem !== '8th Sem' && (
                      <button
                        type="button"
                        onClick={() => setShowBulkPromoteModal(true)}
                        className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
                      >
                        🎓 Bulk Promote
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const defaultYear = selectedYear || '1st Year'
                        const defaultSem = selectedSem || (YEAR_SEMESTERS[defaultYear]?.[0] || '1st Sem')
                        const available = getSectionsForYearAndSem(defaultYear, defaultSem)
                        const defaultSec = selectedSection && selectedSection !== 'ALL' ? selectedSection : (available[0] || 'CSE 1A')

                        setFormData({
                          name: '',
                          email: '',
                          usn: '',
                          year: defaultYear,
                          semester: defaultSem,
                          section: defaultSec,
                          account: 'Inactive',
                          device: 'Not Linked',
                          password: ''
                        })
                        setFormErrors({})
                        setShowAddModal(true)
                      }}
                      className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Student
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3 border-b border-border">Student</th>
                        <th className="px-6 py-3 border-b border-border">USN</th>
                        <th className="px-6 py-3 border-b border-border">Sem / Section</th>
                        <th className="px-6 py-3 border-b border-border">Account</th>
                        <th className="px-6 py-3 border-b border-border">Device Status</th>
                        <th className="px-6 py-3 border-b border-border text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((s, i) => (
                        <tr key={s.usn || i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">{s.usn}</td>
                          <td className="px-6 py-4">
                            <span className="block text-foreground font-medium">{s.section}</span>
                            <span className="text-xs text-muted-foreground">{s.semester} • {s.year}</span>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={s.account} />
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={s.device} />
                          </td>
                          <td className="px-6 py-4 text-right flex gap-2 justify-end">
                            <button
                              onClick={() => openCredentialsModal(s)}
                              className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                              title="View credentials"
                            >
                              <Shield className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(s)}
                              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                              title="Edit student"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openDeleteConfirm(s)}
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                              title="Delete student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                            No students found in {selectedSem} {selectedSection !== 'ALL' ? `(${selectedSection})` : ''} matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                  <span>Showing 1 to {filtered.length} of {filtered.length} entries</span>
                  <div className="flex gap-1">
                    <button disabled className="px-3 py-1 border border-input rounded-md opacity-50">Prev</button>
                    <button className="px-3 py-1 border border-input rounded-md bg-accent text-accent-foreground">1</button>
                    <button disabled className="px-3 py-1 border border-input rounded-md opacity-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADD STUDENT MODAL */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-foreground mb-4">Add Student</h2>

                <div className="space-y-4">
                  <div>
                    <Label required>Name</Label>
                    <Inp
                      type="text"
                      placeholder="Student name"
                      value={formData.name}
                      onChange={(val: any) => updateFormField('name', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-destructive mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Inp
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(val: any) => updateFormField('email', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label required>USN (Register Number)</Label>
                    <Inp
                      type="text"
                      placeholder="01CS401"
                      value={formData.usn}
                      onChange={(val: any) => updateFormField('usn', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.usn && (
                      <p className="text-xs text-destructive mt-1">{formErrors.usn}</p>
                    )}
                  </div>

                  {/* Year - Auto-filled & Read-only */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Academic Year</Label>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        Auto-filled
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={formData.year || selectedYear || ''}
                        className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-muted/60 text-foreground text-sm font-medium cursor-not-allowed select-none outline-none"
                      />
                      <Lock className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                    </div>
                  </div>

                  {/* Semester - Auto-filled & Read-only */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Semester</Label>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        Auto-filled
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={formData.semester || selectedSem || ''}
                        className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-muted/60 text-foreground text-sm font-medium cursor-not-allowed select-none outline-none"
                      />
                      <Lock className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                    </div>
                  </div>

                  {/* Section - Auto-filled & Read-only */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Section</Label>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        Auto-filled
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={formData.section || (selectedSection !== 'ALL' ? selectedSection : sectionsForCurrentSem[0]) || ''}
                        className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-muted/60 text-foreground text-sm font-medium cursor-not-allowed select-none outline-none"
                      />
                      <Lock className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Auto-locked to current selection ({formData.year || selectedYear} • {formData.semester || selectedSem} • {formData.section || (selectedSection !== 'ALL' ? selectedSection : sectionsForCurrentSem[0])}).
                    </p>
                  </div>

                  <div>
                    <Label>Account Status</Label>
                    <select
                      value={formData.account}
                      onChange={(e) => updateFormField('account', e.target.value)}
                      className="w-full mt-1 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                    >
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setFormData({ name: '', email: '', usn: '', year: '', semester: '', section: '', account: 'Inactive', device: 'Not Linked', password: '' })
                      setFormErrors({})
                    }}
                    className="flex-1 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent text-foreground text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStudent}
                    className="flex-1 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EDIT STUDENT MODAL */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-foreground mb-4">Edit Student</h2>

                <div className="space-y-4">
                  <div>
                    <Label required>Name</Label>
                    <Inp
                      type="text"
                      placeholder="Student name"
                      value={formData.name}
                      onChange={(val: any) => updateFormField('name', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-destructive mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label required>USN (Register Number)</Label>
                    <Inp
                      type="text"
                      placeholder="01CS401"
                      value={formData.usn}
                      onChange={(val: any) => updateFormField('usn', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.usn && (
                      <p className="text-xs text-destructive mt-1">{formErrors.usn}</p>
                    )}
                  </div>

                  <div>
                    <Label>Email (Optional)</Label>
                    <Inp
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(val: any) => updateFormField('email', val)}
                      className="w-full mt-1"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label required>Year</Label>
                    <select
                      value={formData.year}
                      onChange={(e) => {
                        const newYear = e.target.value
                        const availableSems = YEAR_SEMESTERS[newYear] || []
                        const newSem = availableSems[0] || '1st Sem'
                        const availableSecs = getSectionsForYearAndSem(newYear, newSem)
                        setFormData(prev => ({
                          ...prev,
                          year: newYear,
                          semester: newSem,
                          section: availableSecs[0] || prev.section
                        }))
                        if (formErrors.year) setFormErrors(prev => { const n = { ...prev }; delete n.year; return n; })
                      }}
                      className="w-full mt-1 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                    >
                      <option value="">Select Year</option>
                      {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    {formErrors.year && (
                      <p className="text-xs text-destructive mt-1">{formErrors.year}</p>
                    )}
                  </div>

                  <div>
                    <Label required>Semester</Label>
                    <select
                      value={formData.semester}
                      onChange={(e) => {
                        const newSem = e.target.value
                        const availableSecs = getSectionsForYearAndSem(formData.year, newSem)
                        setFormData(prev => ({
                          ...prev,
                          semester: newSem,
                          section: availableSecs[0] || prev.section
                        }))
                        if (formErrors.semester) setFormErrors(prev => { const n = { ...prev }; delete n.semester; return n; })
                      }}
                      className="w-full mt-1 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                    >
                      <option value="">Select Semester</option>
                      {(YEAR_SEMESTERS[formData.year] || []).map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                    {formErrors.semester && (
                      <p className="text-xs text-destructive mt-1">{formErrors.semester}</p>
                    )}
                  </div>

                  <div>
                    <Label required>Section</Label>
                    <div className="space-y-2 mt-1">
                      <select
                        value={
                          getSectionsForYearAndSem(formData.year, formData.semester).includes(formData.section)
                            ? formData.section
                            : (formData.section ? '__custom__' : '')
                        }
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            updateFormField('section', '')
                          } else {
                            updateFormField('section', e.target.value)
                          }
                        }}
                        className="w-full h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                      >
                        <option value="">Select Section</option>
                        {getSectionsForYearAndSem(formData.year, formData.semester).map(sec => (
                          <option key={sec} value={sec}>{sec}</option>
                        ))}
                        <option value="__custom__">+ Enter Custom Section</option>
                      </select>
                      {(!getSectionsForYearAndSem(formData.year, formData.semester).includes(formData.section) || formData.section === '') && (
                        <Inp
                          placeholder="Enter section (e.g. CSE 4A)"
                          value={formData.section}
                          onChange={(val: any) => updateFormField('section', val)}
                        />
                      )}
                    </div>
                    {formErrors.section && (
                      <p className="text-xs text-destructive mt-1">{formErrors.section}</p>
                    )}
                  </div>

                  <div>
                    <Label>Account Status</Label>
                    <select
                      value={formData.account}
                      onChange={(e) => updateFormField('account', e.target.value)}
                      className="w-full mt-1 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                    >
                      <option value="Inactive">Inactive</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>

                  <div>
                    <Label>Device Status</Label>
                    <select
                      value={formData.device}
                      onChange={(e) => updateFormField('device', e.target.value)}
                      className="w-full mt-1 h-9 px-3 rounded-md border border-input bg-background text-foreground text-sm"
                    >
                      <option value="Not Linked">Not Linked</option>
                      <option value="Linked">Linked</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setShowEditModal(false)
                      setStudentToEdit(null)
                      setFormData({ name: '', email: '', usn: '', year: '', semester: '', section: '', account: 'Inactive', device: 'Not Linked', password: '' })
                      setFormErrors({})
                    }}
                    className="flex-1 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent text-foreground text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditStudent}
                    className="flex-1 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">Delete Student</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to delete <strong>{studentToDelete?.name}</strong> ({studentToDelete?.usn})? This action cannot be undone.
                </p>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setStudentToDelete(null)
                    }}
                    className="flex-1 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent text-foreground text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteStudent}
                    className="flex-1 px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS MODAL - Student Added */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h2 className="text-lg font-semibold text-foreground">Student Added Successfully</h2>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Student Name</p>
                    <p className="text-foreground font-medium">{lastAddedStudent?.name || formData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">USN</p>
                    <p className="text-foreground font-medium font-mono">{lastAddedStudent?.usn || formData.usn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Assigned Section</p>
                    <p className="text-foreground font-medium">
                      {lastAddedStudent?.dept} • {lastAddedStudent?.year} • {lastAddedStudent?.section}
                    </p>
                  </div>
                  {newStudentPassword ? (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Generated Password</p>
                      <div className="flex gap-2 mt-1">
                        <code className="flex-1 px-3 py-2 rounded-md bg-background border border-border font-mono text-sm text-foreground break-all">
                          {newStudentPassword}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(newStudentPassword)
                            alert('Password copied to clipboard!')
                          }}
                          className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Account Status</p>
                      <p className="text-sm text-muted-foreground">Account is Inactive. Password will be generated when account is activated.</p>
                    </div>
                  )}
                </div>

                {newStudentPassword && (
                  <p className="text-sm text-muted-foreground mb-6">
                    Share this password with the student. They can change it after first login.
                  </p>
                )}

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* CREDENTIALS MODAL - View Password */}
          {showCredentialsModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Password</h2>

                {selectedStudentForCredentials?.password ? (
                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Password</p>
                      <div className="flex gap-2">
                        <code className="flex-1 px-3 py-2 rounded-md bg-background border border-border font-mono text-sm text-foreground break-all">
                          {selectedStudentForCredentials?.password}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedStudentForCredentials?.password || '')
                            alert('Password copied to clipboard!')
                          }}
                          className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">No password set. Account status is Inactive.</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowCredentialsModal(false)
                    setSelectedStudentForCredentials(null)
                  }}
                  className="w-full px-4 py-2 rounded-md bg-background border border-input hover:bg-accent text-foreground text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Bulk Promote Modal */}
          {showBulkPromoteModal && selectedSem && selectedYear && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="bg-card border border-border shadow-lg rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-6 border-b border-border bg-muted/30">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    🎓 Bulk Promote Students
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Promote all students in {selectedYear}, {selectedSem} to the next semester.
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-900">Students to promote:</span>
                      <span className="text-lg font-bold text-blue-700">
                        {students_data.filter(s => s.year === selectedYear && s.semester === selectedSem && (adminDept === 'ALL' || s.dept === adminDept)).length}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-blue-800">
                      <span className="font-semibold">{selectedSem}</span>
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span className="font-semibold">
                        {SEM_NUM_TO_LABEL[(SEM_LABEL_TO_NUM[selectedSem] || 1) + 1] || 'Graduated'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <strong>⚠ Warning:</strong> After promotion, the active semester will automatically flip from <strong>{(activeSemTypes[selectedYear || ''] || 'odd').toUpperCase()}</strong> to <strong>{(activeSemTypes[selectedYear || ''] || 'odd') === 'odd' ? 'EVEN' : 'ODD'}</strong>.
                  </div>
                </div>

                <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                  <button
                    onClick={() => setShowBulkPromoteModal(false)}
                    className="px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBulkPromote}
                    className="px-4 py-2 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm flex items-center gap-2"
                  >
                    Confirm Promotion
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminContent>
    </AdminShell>
  )
}

// ─── Faculty Page ─────────────────────────────────────────────────────────────
const faculty = [
  { name: 'Dr. Rakesh Menon', id: 'FAC001', dept: 'CSE', role: 'HOD', account: 'Active' },
  { name: 'Prof. Sunita Rao', id: 'FAC002', dept: 'CSE', role: 'Asst. Professor', account: 'Active' },
  { name: 'Dr. Vivek Sharma', id: 'FAC003', dept: 'ECE', role: 'HOD', account: 'Active' },
  { name: 'Prof. Anil Kumar', id: 'FAC004', dept: 'IT', role: 'Professor', account: 'Active' },
]

export function FacultyPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => faculty.filter(f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.id.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  )

  return (
    <AdminShell>
      <AdminContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Faculty</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage teaching staff and their department roles.</p>
            </div>
            <button className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Faculty
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-4 border-b border-border">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3 border-b border-border">Faculty Name</th>
                    <th className="px-6 py-3 border-b border-border">Faculty ID</th>
                    <th className="px-6 py-3 border-b border-border">Department</th>
                    <th className="px-6 py-3 border-b border-border">Role</th>
                    <th className="px-6 py-3 border-b border-border">Status</th>
                    <th className="px-6 py-3 border-b border-border text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((f, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{f.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{f.id}</td>
                      <td className="px-6 py-4">{f.dept}</td>
                      <td className="px-6 py-4">{f.role}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={f.account} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminContent>
    </AdminShell>
  )
}
