import { useState } from 'react';

// Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Submission {
  id: string;
  title: string;
  date: string;
  leadName: string;
  members: TeamMember[];
  documentUrl: string;
  documentName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface SubmissionCardProps {
  submission: Submission;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

// Mock Data
const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Eco Friendly',
    date: '24-11-2025',
    leadName: 'Jokowi',
    members: [
      { id: '1', name: 'Bahlul', role: 'Anggota 1' },
      { id: '2', name: 'Anies', role: 'Anggota 2' },
      { id: '3', name: 'FufuFafa', role: 'Anggota 2' },
    ],
    documentUrl: '#',
    documentName: 'Grand_Design_kelompok_Jokowi.pdf',
    status: 'pending',
  },
];

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

  const handleAccept = (id: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: 'accepted' as const } : sub
      )
    );
    console.log('Accepted submission:', id);
  };

  const handleReject = (id: string) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    console.log('Rejected submission:', id);
  };

  return {
    submissions,
    handleAccept,
    handleReject,
  };
}