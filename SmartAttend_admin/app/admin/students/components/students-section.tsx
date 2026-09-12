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
  return 'cse';
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

  // Determine active semester type (odd/even) based on current month
  // Months 7-12 (July-Dec) = odd semesters (1,3,5,7); Months 1-6 (Jan-June) = even semesters (2,4,6,8)
  const activeSemType = useMemo(() => {
    const month = new Date().getMonth() + 1; // 1-12
    return month >= 7 ? 'odd' : 'even';
  }, []);

  // Helper to determine if a semester number matches the current active semester type
  const isSemesterActive = (sem: number): boolean =>
    activeSemType === 'odd' ? sem % 2 === 1 : sem % 2 === 0;

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
        setStudents(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Make sure backend is running on port 5000');
        // Fallback demo data
        setStudents([
          {
            id: '1', name: 'Raj Kumar', usn: 'CSE001',
            department: 'Computer Science Engineering',
            semester: 1, section: 'A', academicYear: 1,
            email: 'raj@college.com', deviceBound: true,
          },
          {
            id: '2', name: 'Priya Singh', usn: 'CSE002',
            department: 'Computer Science Engineering',
            semester: 1, section: 'A', academicYear: 1,
            email: 'priya@college.com', deviceBound: false,
          },
          {
            id: '3', name: 'Ankit Patel', usn: 'CSE003',
            department: 'Computer Science Engineering',
            semester: 1, section: 'B', academicYear: 1,
            email: 'ankit@college.com', deviceBound: true,
          },
          {
            id: '4', name: 'Sarah Khan', usn: 'CSE004',
            department: 'Computer Science Engineering',
            semester: 3, section: 'A', academicYear: 2,
            email: 'sarah@college.com', deviceBound: false,
          },
          {
            id: '5', name: 'Mohan Das', usn: 'CSE005',
            department: 'Computer Science Engineering',
            semester: 5, section: 'A', academicYear: 3,
            email: 'mohan@college.com', deviceBound: true,
          },
          {
            id: '6', name: 'Neha Sharma', usn: 'CSE006',
            department: 'Computer Science Engineering',
            semester: 7, section: 'A', academicYear: 4,
            email: 'neha@college.com', deviceBound: true,
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
    // For a given academic year, the two possible semesters are: year*2-1 and year*2
    const oddSem = year * 2 - 1;
    const evenSem = year * 2;
    return [oddSem, evenSem];
  }, [drillState]);

  const divisions = useMemo(() => {
    if (drillState.level !== 'divisions' || drillState.selectedSemester === undefined) return [];
    const depts = students
      .filter(s => s.semester === drillState.selectedSemester && s.academicYear === drillState.selectedYear)
      .map(s => s.department);
    return Array.from(new Set(depts)).sort();
  }, [students, drillState]);

  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (drillState.selectedYear !== undefined) {
      filtered = filtered.filter(s => s.academicYear === drillState.selectedYear);
    }
    if (drillState.selectedSemester !== undefined) {
      filtered = filtered.filter(s => s.semester === drillState.selectedSemester);
    }
    if (drillState.selectedDivision) {
      filtered = filtered.filter(s => s.department === drillState.selectedDivision);
    }

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

  // Drill down handler
  const handleDrillDown = (level: DrillLevel, data?: { year?: number; semester?: number; division?: string }) => {
    setSearchQuery('');
    setDrillState(prev => ({
      level,
      selectedYear: data?.year ?? prev.selectedYear,
      selectedSemester: data?.semester,
      selectedDivision: data?.division,
    }));
  };

  // Click a year → go directly to students of the active semester
  const handleYearClick = (year: number) => {
    const yearStudents = students.filter(s => s.academicYear === year);
    const activeSem = yearStudents.find(s => isSemesterActive(s.semester))?.semester;
    if (activeSem !== undefined) {
      setDrillState({ level: 'students', selectedYear: year, selectedSemester: activeSem, selectedDivision: undefined });
    } else {
      setDrillState({ level: 'semesters', selectedYear: year });
    }
    setSearchQuery('');
  };

  const handleBack = () => {
    setSearchQuery('');
    setDrillState({ level: 'years' });
  };

  // Bulk Promotion: move all students of a given academic year to the next semester
  const bulkPromote = (year: number) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.academicYear !== year) return s;
        let newSem = s.semester + 1;
        let newYear = s.academicYear;
        if (newSem > 8) {
          // Graduated — remove by filtering out later (keep but mark)
          return { ...s, semester: newSem, academicYear: newYear };
        }
        // Update academic year based on new semester
        newYear = Math.ceil(newSem / 2);
        return { ...s, semester: newSem, academicYear: newYear };
      })
    );
    // Return to years view after promotion so UI refreshes
    setDrillState({ level: 'years' });
  };

  // ─── Render: Year cards ───────────────────────────────────────────────────────
  const renderYears = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select Academic Year</h2>
      <p className="text-sm text-gray-500">
        Currently <strong>{activeSemType === 'odd' ? 'Odd' : 'Even'} Semester</strong> is going on.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {years.length === 0 ? (
          <p className="text-gray-500 col-span-4">No student data available.</p>
        ) : (
          years.map(year => {
            const yearStudents = students.filter(s => s.academicYear === year);
            const oddSem = year * 2 - 1;
            const evenSem = year * 2;
            const activeSem = activeSemType === 'odd' ? oddSem : evenSem;
            const activeSemStudents = yearStudents.filter(s => s.semester === activeSem);
            return (
              <div key={year} className="flex flex-col space-y-2">
                <button
                  onClick={() => handleYearClick(year)}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left bg-white"
                >
                  <h3 className="text-3xl font-bold text-gray-900">Year {year}</h3>
                  <p className="text-sm text-gray-600 mt-1">{yearStudents.length} total students</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Sem {activeSem} active · {activeSemStudents.length} students
                  </p>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Promote all Year ${year} students to the next semester?`)) {
                      bulkPromote(year);
                    }
                  }}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium"
                >
                  🎓 Bulk Promote Year {year}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // ─── Render: Semester cards ───────────────────────────────────────────────────
  const renderSemesters = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Semesters — Year {drillState.selectedYear}
      </h2>
      <p className="text-sm text-gray-500">
        Currently <strong>{activeSemType === 'odd' ? 'Odd' : 'Even'} Semester</strong> is going on.
        Inactive semesters are locked.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {semesters.map(sem => {
          const semStudents = students.filter(
            s => s.semester === sem && s.academicYear === drillState.selectedYear
          );
          const active = isSemesterActive(sem);
          return (
            <div key={sem} className="relative">
              <button
                onClick={() => {
                  if (active) {
                    handleDrillDown('students', { year: drillState.selectedYear, semester: sem });
                  }
                }}
                disabled={!active}
                className={`w-full p-6 rounded-lg border-2 text-left transition-all ${active
                  ? 'border-green-400 bg-green-50 hover:border-green-600 hover:shadow-lg cursor-pointer'
                  : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-70'
                  }`}
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  Semester {sem}
                  {active && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full align-middle">
                      Active
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{semStudents.length} students</p>
                {!active && (
                  <p className="text-sm text-red-500 mt-2">
                    ⚠ Currently {activeSemType} semester is going on
                  </p>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── Render: Division (department) cards ─────────────────────────────────────
  const renderDivisions = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Divisions — Year {drillState.selectedYear}, Sem {drillState.selectedSemester}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {divisions.length === 0 ? (
          <p className="text-gray-500">No divisions found.</p>
        ) : (
          divisions.map(division => {
            const deptStudents = students.filter(
              s => s.department === division && s.semester === drillState.selectedSemester && s.academicYear === drillState.selectedYear
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
          })
        )}
      </div>
    </div>
  );

  // ─── Render: Students table ───────────────────────────────────────────────────
  const renderStudents = () => {
    const semActive = drillState.selectedSemester !== undefined
      ? isSemesterActive(drillState.selectedSemester)
      : true;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Students — Year {drillState.selectedYear}, Sem {drillState.selectedSemester}
            {drillState.selectedDivision ? ` (${getDepartmentKey(drillState.selectedDivision).toUpperCase()})` : ''}
          </h2>
          <span className="text-sm text-gray-600">{filteredStudents.length} results</span>
        </div>

        {/* Active semester banner */}
        {semActive ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
            ✅ Semester {drillState.selectedSemester} is currently active.
          </div>
        ) : (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            ⚠ Currently <strong>{activeSemType} semester</strong> is going on. Semester {drillState.selectedSemester} is inactive.
          </div>
        )}

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
                        className={`px-2 py-1 rounded text-xs font-medium ${student.deviceBound
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
            No students found{searchQuery ? ' matching your search' : ' in this semester'}.
          </div>
        )}
      </div>
    );
  };

  // ─── Loading state ────────────────────────────────────────────────────────────
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

  // ─── Main render ──────────────────────────────────────────────────────────────
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
                title="Go back to years"
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
          <div className="mb-6 text-sm text-gray-600 flex items-center gap-1">
            <button
              onClick={() => handleDrillDown('years')}
              className="text-blue-600 hover:underline"
            >
              Years
            </button>
            {drillState.selectedYear !== undefined && (
              <>
                <span>/</span>
                <button
                  onClick={() => setDrillState({ level: 'semesters', selectedYear: drillState.selectedYear })}
                  className="text-blue-600 hover:underline"
                >
                  Year {drillState.selectedYear}
                </button>
              </>
            )}
            {drillState.selectedSemester !== undefined && (
              <>
                <span>/</span>
                <span>Sem {drillState.selectedSemester}</span>
              </>
            )}
            {drillState.selectedDivision && (
              <>
                <span>/</span>
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
