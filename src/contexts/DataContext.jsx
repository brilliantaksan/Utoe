"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { students as mockStudents, filterStudents } from '../data/mockData';
import { createSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';

const DataContext = createContext();

export function DataProvider({ children }) {
  const { getToken } = useAuth();
  const getSupabaseToken = useCallback(async () => {
    try {
      return await getToken({ template: 'supabase' });
    } catch (error) {
      return await getToken();
    }
  }, [getToken]);

  const supabase = useMemo(() => createSupabaseClient(getSupabaseToken), [getSupabaseToken]);

  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    techStack: [],
    availability: []
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Load students from Supabase (or fallback to localStorage/mock data)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const saved = localStorage.getItem('students');
        if (saved) {
          setStudents(JSON.parse(saved));
        } else {
          setStudents(mockStudents);
        }
      } catch (error) {
        console.error('Failed to load students:', error);
        setStudents(mockStudents);
      }
      return;
    }

    const loadStudents = async () => {
      setIsLoading(true);
      setLoadError('');
      const { data, error } = await supabase
        .from('students')
        .select('*, projects (*)')
        .order('id', { ascending: true });

      if (error) {
        console.error('Failed to load students from Supabase:', error);
        setLoadError('Unable to load talent right now.');
        setStudents([]);
      } else {
        const normalized = (data || []).map((student) => ({
          ...student,
          techStack: student.tech_stack || student.techStack || [],
          githubUrl: student.github_url || student.githubUrl || '',
          projects: (student.projects || []).map((project) => ({
            ...project,
            techStack: project.tech_stack || project.techStack || [],
            githubUrl: project.github_url || project.githubUrl || ''
          }))
        }));
        setStudents(normalized);
      }
      setIsLoading(false);
    };

    loadStudents();
  }, [supabase]);

  // Save students to localStorage whenever they change (fallback mode only)
  useEffect(() => {
    if (!isSupabaseConfigured && students.length > 0) {
      try {
        localStorage.setItem('students', JSON.stringify(students));
      } catch (error) {
        console.error('Failed to save students:', error);
      }
    }
  }, [students]);

  const addStudent = async (student) => {
    if (!isSupabaseConfigured || !supabase) {
      const newStudent = {
        ...student,
        id: Math.max(...students.map(s => s.id), 0) + 1
      };
      setStudents([...students, newStudent]);
      return newStudent;
    }

    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert({
        name: student.name,
        email: student.email,
        location: student.location,
        github_url: student.githubUrl,
        bio: student.bio,
        availability: student.availability,
        tech_stack: student.techStack
      })
      .select('*')
      .single();

    if (studentError) {
      console.error('Failed to add student:', studentError);
      throw studentError;
    }

    const projectRows = (student.projects || []).map((project) => ({
      student_id: studentData.id,
      title: project.title,
      description: project.description,
      tech_stack: project.techStack || [],
      impact: project.impact,
      github_url: project.githubUrl || null
    }));

    let projects = [];
    if (projectRows.length > 0) {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert(projectRows)
        .select('*');

      if (projectError) {
        console.error('Failed to add projects:', projectError);
        throw projectError;
      }
      projects = projectData || [];
    }

    const newStudent = {
      ...studentData,
      techStack: studentData.tech_stack || [],
      githubUrl: studentData.github_url || '',
      projects: projects.map((project) => ({
        ...project,
        techStack: project.tech_stack || [],
        githubUrl: project.github_url || ''
      }))
    };

    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = async (id, updates) => {
    if (!isSupabaseConfigured || !supabase) {
      setStudents(students.map(s =>
        s.id === id ? { ...s, ...updates } : s
      ));
      return;
    }

    const payload = {
      ...updates,
      github_url: updates.githubUrl,
      tech_stack: updates.techStack
    };
    delete payload.githubUrl;
    delete payload.techStack;

    const { error } = await supabase
      .from('students')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Failed to update student:', error);
      throw error;
    }
  };

  const getFilteredStudents = () => {
    return filterStudents(filters)(students);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      techStack: [],
      availability: []
    });
  };

  const value = {
    students,
    addStudent,
    updateStudent,
    filters,
    updateFilters,
    resetFilters,
    getFilteredStudents,
    selectedStudent,
    setSelectedStudent,
    isLoading,
    loadError
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
