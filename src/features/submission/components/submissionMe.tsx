import { useState } from 'react';
import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Avatar } from '~/components/ui/avatar';
import { AcceptSubmission } from './accSubmission';
import { RejectSubmission } from './rejectSubmission';

// Mock data
const mockSubmissions = [
  {
    id: 1,
    title: 'Eco Friendly',
    date: '24-11-2025',
    leader: 'Ketua Kelompoknya Jokowi',
    members: [
      { id: 1, name: 'Anggota 1 (Bahlul)' },
      { id: 2, name: 'Anggota 2 (Anies)' },
      { id: 3, name: 'Anggota 2 (FufuFafa)' }
    ],
    document: 'Grand_Design_kelompok_Jokowi.pdf'
  },
  // ...existing code...
];

export function SubmissionMe() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(mockSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubmissions = mockSubmissions.slice(startIndex, startIndex + itemsPerPage);

  const handleAccept = () => {
    console.log('Submission accepted:', selectedSubmissionId);
    setSelectedSubmissionId(null);
  };

  const handleReject = () => {
    console.log('Submission rejected:', selectedSubmissionId);
    setSelectedSubmissionId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          8 Tim <span className="text-2xl font-normal">- Mengajukan Penerusan</span>
        </h1>
        <Button variant="default" className="bg-black text-white hover:bg-gray-800">
          Casptone saya
        </Button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentSubmissions.map((submission) => (
          <Card key={submission.id} className="p-6 border-2 rounded-2xl">
            {/* Header Card */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{submission.title}</h2>
              <span className="text-sm text-gray-600">{submission.date}</span>
            </div>

            {/* Leader Badge */}
            <Badge variant="default" className="mb-4 bg-black text-white hover:bg-black px-3 py-1">
              <span className="mr-2">👑</span>
              {submission.leader}
            </Badge>

            {/* Members */}
            <div className="space-y-2 mb-4">
              {submission.members.map((member) => (
                <div key={member.id} className="flex items-center gap-2 border rounded-full px-3 py-2">
                  <Avatar className="w-6 h-6">
                    <span className="text-xs">👤</span>
                  </Avatar>
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>

            {/* Document */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span>📄</span>
              <a href="#" className="underline hover:text-blue-600">
                {submission.document}
              </a>
              <button className="ml-auto">🔗</button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <RejectSubmission
                trigger={
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-gray-50"
                  >
                    Tolak
                  </Button>
                }
                onReject={() => {
                  setSelectedSubmissionId(submission.id);
                  handleReject();
                }}
              />
              <AcceptSubmission
                trigger={
                  <Button
                    variant="default"
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    Terima
                  </Button>
                }
                onAccept={() => {
                  setSelectedSubmissionId(submission.id);
                  handleAccept();
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &lt; Sebelumnya
        </Button>
        
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "ghost"}
            className={currentPage === i + 1 ? "bg-black text-white" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        
        {totalPages > 3 && <span>...</span>}
        
        <Button
          variant="ghost"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Selanjutnya &gt;
        </Button>
      </div>
    </div>
  );
}