'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Search, Loader2 } from 'lucide-react';

// Types
interface Student {
  id: string;
  name: string;
  usn: string;
  department: string;
  semester: number;
  section: string;
  academicYear: number;
  email: string;
  deviceBound: boolean;
  boundDeviceName?: string | null;
}

type DrillLevel = 'years' | 'semesters' | 'divisions' | 'students';

interface DrillState {
  level: DrillLevel;
  selectedYear?: number;
  selectedSemester?: number;
  selectedDivision?: string;
}

// Constants
const DEPARTMENT_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  cse: { bg: 'bg-blue-50', text: 'text-blue-900', badge: 'bg-blue-200' },
  ece: { bg: 'bg-purple-50', text: 'text-purple-900', badge: 'bg-purple-200' },
  it: { bg: 'bg-green-50', text: 'text-green-900', badge: 'bg-green-200' },
  me: { bg: 'bg-orange-50', text: 'text-orange-900', badge: 'bg-orange-200' },
};

const SEMESTER_MAP: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4,
};

// Helper functions
const getDepartmentKey = (deptName: string): string => {
  const lower = deptName.toLowerCase();
  if (lower.includes('computer') || lower.includes('cse')) return 'cse';
  if (lower.includes('electronics') || lower.includes('ece')) return 'ece';
  if (lower.includes('information') || lower.includes('it')) return 'it';
  if (lower.includes('mechanical') || lower.includes('me')) return 'me';
  return 'cse'; // default
};

const getDepartmentColors = (deptName: string) => {
  const key = getDepartmentKey(deptName);
  return DEPARTMENT_COLORS[key] || DEPARTMENT_COLORS.cse;
};

const getAcademicYear = (semester: number): number => SEMESTER_MAP[semester] || 1;

export function StudentsSection() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [drillState, setDrillState] = useState<DrillState>({ level: 'years' });

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/admin/students', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch students');

        const data = await response.json();
        // Hardcode CSE department filter for testing
        const filtered = data.data.filter((s: Student) =>
          getDepartmentKey(s.department) === 'cse'
        );
        setStudents(filtered);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Make sure backend is running on port 5000');
        // Fallback demo data
        setStudents([
          {
            id: '1', name: 'Raj Kumar', usn: 'CSE001', department: 'Computer Science Engineering',
            semester: 5, section: 'A', academicYear: 3, email: 'raj@college.com', deviceBound: true,
          },
          {
            id: '2', name: 'Priya Singh', usn: 'CSE002', department: 'Computer Science Engineering',
            semester: 5, section: 'A', academicYear: 3, email: 'priya@college.com', deviceBound: false,
          },
          {
            id: '3', name: 'Ankit Patel', usn: 'CSE003', department: 'Computer Science Engineering',
            semester: 5, section: 'B', academicYear: 3, email: 'ankit@college.com', deviceBound: true,
          },
          {
            id: '4', name: 'Sarah Khan', usn: 'CSE004', department: 'Computer Science Engineering',
            semester: 7, section: 'A', academicYear: 4, email: 'sarah@college.com', deviceBound: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Memoized grouping logic
  const years = useMemo(() => {
    const yearSet = new Set(students.map(s => s.academicYear));
    return Array.from(yearSet).sort((a, b) => a - b);
  }, [students]);

  const semesters = useMemo(() => {
    if (drillState.level !== 'semesters' || !drillState.selectedYear) return [];
    const year = drillState.selectedYear;
    const yearSemesters = students
      .filter(s => s.academicYear === year)
      .map(s => s.semester);
    return Array.from(new Set(yearSemesters)).sort((a, b) => a - b);
  }, [students, drillState]);

  const divisions = useMemo(() => {
    if (drillState.level !== 'divisions' || drillState.selectedSemester === undefined) return [];
    const depts = students
      .filter(s => s.semester === drillState.selectedSemester)
      .map(s => s.department);
    return Array.from(new Set(depts)).sort();
  }, [students, drillState]);

  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (drillState.selectedYear) {
      filtered = filtered.filter(s => s.academicYear === drillState.selectedYear);
    }
    if (drillState.selectedSemester !== undefined) {
      filtered = filtered.filter(s => s.semester === drillState.selectedSemester);
    }
    if (drillState.selectedDivision) {
      filtered = filtered.filter(s => s.department === drillState.selectedDivision);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.usn.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.usn.localeCompare(b.usn));
  }, [students, drillState, searchQuery]);

  const handleDrillDown = (level: DrillLevel, data?: { year?: number; semester?: number; division?: string }) => {
    setSearchQuery('');
    setDrillState(prev => ({
      level,
      selectedYear: data?.year ?? prev.selectedYear,
      selectedSemester: data?.semester ?? prev.selectedSemester,
      selectedDivision: data?.division ?? prev.selectedDivision,
    }));
  };

  const handleBack = () => {
    setSearchQuery('');
    if (drillState.level === 'semesters') {
      setDrillState({ level: 'years' });
    } else if (drillState.level === 'divisions') {
      setDrillState({ level: 'semesters', selectedYear: drillState.selectedYear });
    } else if (drillState.level === 'students') {
      setDrillState({
        level: 'divisions',
        selectedYear: drillState.selectedYear,
        selectedSemester: drillState.selectedSemester,
      });
    }
  };

  // Render functions
  const renderYears = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select Academic Year</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {years.map(year => {
          const yearStudents = students.filter(s => s.academicYear === year);
          return (
            <button
              key={year}
              onClick={() => handleDrillDown('semesters', { year })}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left"
            >
              <h3 className="text-3xl font-bold text-gray-900">Year {year}</h3>
              <p className="text-sm text-gray-600 mt-2">{yearStudents.length} students</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderSemesters = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select Semester (Year {drillState.selectedYear})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {semesters.map(sem => {
          const semStudents = students.filter(s => s.semester === sem && s.academicYear === drillState.selectedYear);
          return (
            <button
              key={sem}
              onClick={() => handleDrillDown('divisions', { year: drillState.selectedYear, semester: sem })}
              className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left"
            >
              <h3 className="text-3xl font-bold text-gray-900">Sem {sem}</h3>
              <p className="text-sm text-gray-600 mt-2">{semStudents.length} students</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderDivisions = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Select Division (Year {drillState.selectedYear}, Sem {drillState.selectedSemester})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {divisions.map(division => {
          const deptStudents = students.filter(
            s => s.department === division && s.semester === drillState.selectedSemester
          );
          const colors = getDepartmentColors(division);
          const deptKey = getDepartmentKey(division);

          return (
            <button
              key={division}
              onClick={() =>
                handleDrillDown('students', {
                  year: drillState.selectedYear,
                  semester: drillState.selectedSemester,
                  division,
                })
              }
              className={`p-6 rounded-lg border-2 border-gray-200 hover:shadow-lg transition-all text-left ${colors.bg}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{division}</h3>
                  <p className="text-sm text-gray-600 mt-2">{deptStudents.length} students</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                  {deptKey.toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Students - {drillState.selectedDivision}
        </h2>
        <span className="text-sm text-gray-600">{filteredStudents.length} results</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by name, USN, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      {filteredStudents.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">USN</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Section</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Device</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono">{student.usn}</td>
                  <td className="px-4 py-3 text-gray-600">{student.email}</td>
                  <td className="px-4 py-3 text-gray-600">{student.section}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        student.deviceBound
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {student.deviceBound ? '✓ Bound' : 'Not Bound'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No students found matching your search.
        </div>
      )}
    </div>
  );

  // Main render
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {drillState.level !== 'years' && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white rounded-lg transition"
                title="Go back"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
            )}
            <h1 className="text-4xl font-bold text-gray-900">Students</h1>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">{error}</p>
              <p className="text-xs text-yellow-700 mt-1">Using demo data for preview.</p>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        {drillState.level !== 'years' && (
          <div className="mb-6 text-sm text-gray-600">
            <button
              onClick={() => handleDrillDown('years')}
              className="text-blue-600 hover:underline"
            >
              Years
            </button>
            {drillState.selectedYear && (
              <>
                {' / Year '}
                <span>{drillState.selectedYear}</span>
              </>
            )}
            {drillState.selectedSemester && (
              <>
                {' / Sem '}
                <span>{drillState.selectedSemester}</span>
              </>
            )}
            {drillState.selectedDivision && (
              <>
                {' / '}
                <span>{getDepartmentKey(drillState.selectedDivision).toUpperCase()}</span>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {drillState.level === 'years' && renderYears()}
          {drillState.level === 'semesters' && renderSemesters()}
          {drillState.level === 'divisions' && renderDivisions()}
          {drillState.level === 'students' && renderStudents()}
        </div>
      </div>
    </div>
  );
}
