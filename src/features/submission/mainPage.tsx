import { Header } from '../home/components/header';
import { Navigation } from '../home/components/navigation';
import { Footer } from '../home/components/footer';
import { SubmissionSection } from './components/submissionSection';
import { useSubmissions } from '~/features/submission/hooks/useSubmission';

export function MainPage() {
  const { submissions, handleAccept, handleReject } = useSubmissions();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navigation />
      
      <main className="flex-1 bg-gray-50">
        <SubmissionSection
          submissions={submissions}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </main>

      <Footer />
    </div>
  );
}