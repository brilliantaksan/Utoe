"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { createSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';

const RecruiterContext = createContext();

export function RecruiterProvider({ children }) {
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [recruiterProfile, setRecruiterProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const { getToken, userId } = useAuth();
  const { user } = useUser();

  const getSupabaseToken = useCallback(async () => {
    try {
      return await getToken({ template: 'supabase' });
    } catch (error) {
      return await getToken();
    }
  }, [getToken]);

  const supabase = useMemo(() => createSupabaseClient(getSupabaseToken), [getSupabaseToken]);

  // Load saved candidates from localStorage
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const saved = localStorage.getItem('savedCandidates');
        if (saved) {
          setSavedCandidates(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load saved candidates:', error);
      }
      return;
    }

    const loadSaved = async () => {
      if (!userId) return;
      setIsLoading(true);
      setLoadError('');

      const { data: recruiterData, error: recruiterError } = await supabase
        .from('recruiters')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (recruiterError) {
        console.error('Failed to load recruiter profile:', recruiterError);
        setLoadError('Unable to load recruiter data.');
        setIsLoading(false);
        return;
      }

      let profile = recruiterData;
      if (!profile) {
        const { data: created, error: createError } = await supabase
          .from('recruiters')
          .insert({
            user_id: userId,
            name: user?.fullName || user?.firstName || 'Recruiter',
            email: user?.primaryEmailAddress?.emailAddress || '',
            company_name: ''
          })
          .select('*')
          .single();

        if (createError) {
          console.error('Failed to create recruiter profile:', createError);
          setLoadError('Unable to initialize recruiter profile.');
          setIsLoading(false);
          return;
        }
        profile = created;
      }

      setRecruiterProfile(profile);

      const { data: savedRows, error: savedError } = await supabase
        .from('saved_candidates')
        .select('*')
        .eq('recruiter_id', profile.id)
        .order('saved_at', { ascending: false });

      if (savedError) {
        console.error('Failed to load saved candidates:', savedError);
        setLoadError('Unable to load saved candidates.');
      } else {
        setSavedCandidates(savedRows || []);
      }
      setIsLoading(false);
    };

    loadSaved();
  }, [supabase, userId, user]);

  // Save to localStorage whenever savedCandidates changes
  useEffect(() => {
    if (!isSupabaseConfigured) {
      try {
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      } catch (error) {
        console.error('Failed to save candidates:', error);
      }
    }
  }, [savedCandidates]);

  const saveCandidate = async (studentId, notes = '') => {
    const existing = savedCandidates.find(c => c.student_id === studentId || c.studentId === studentId);
    if (existing) return;

    if (!isSupabaseConfigured || !supabase || !recruiterProfile) {
      const newCandidate = {
        studentId,
        savedAt: new Date().toISOString(),
        notes
      };
      setSavedCandidates([...savedCandidates, newCandidate]);
      return;
    }

    const { data, error } = await supabase
      .from('saved_candidates')
      .insert({
        recruiter_id: recruiterProfile.id,
        student_id: studentId,
        notes
      })
      .select('*')
      .single();

    if (error) {
      console.error('Failed to save candidate:', error);
      return;
    }

    setSavedCandidates((prev) => [data, ...prev]);
  };

  const unsaveCandidate = async (studentId) => {
    if (!isSupabaseConfigured || !supabase || !recruiterProfile) {
      setSavedCandidates(savedCandidates.filter(c => c.studentId !== studentId));
      return;
    }

    const { error } = await supabase
      .from('saved_candidates')
      .delete()
      .eq('recruiter_id', recruiterProfile.id)
      .eq('student_id', studentId);

    if (error) {
      console.error('Failed to unsave candidate:', error);
      return;
    }

    setSavedCandidates(savedCandidates.filter(c => c.student_id !== studentId));
  };

  const isCandidateSaved = (studentId) => {
    return savedCandidates.some(c => c.studentId === studentId || c.student_id === studentId);
  };

  const updateCandidateNotes = async (studentId, notes) => {
    if (!isSupabaseConfigured || !supabase || !recruiterProfile) {
      setSavedCandidates(savedCandidates.map(c =>
        c.studentId === studentId ? { ...c, notes } : c
      ));
      return;
    }

    const { error } = await supabase
      .from('saved_candidates')
      .update({ notes })
      .eq('recruiter_id', recruiterProfile.id)
      .eq('student_id', studentId);

    if (error) {
      console.error('Failed to update notes:', error);
      return;
    }

    setSavedCandidates(savedCandidates.map(c =>
      c.student_id === studentId ? { ...c, notes } : c
    ));
  };

  const value = {
    savedCandidates,
    saveCandidate,
    unsaveCandidate,
    isCandidateSaved,
    updateCandidateNotes,
    recruiterProfile,
    setRecruiterProfile,
    isLoading,
    loadError
  };

  return (
    <RecruiterContext.Provider value={value}>
      {children}
    </RecruiterContext.Provider>
  );
}

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (!context) {
    throw new Error('useRecruiter must be used within a RecruiterProvider');
  }
  return context;
};
