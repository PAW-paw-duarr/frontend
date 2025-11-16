import { Header } from '../home/components/hederSection';
import { Navigation } from '~/components/ui/navigation';
import { FooterSection } from '../home/components/footerSection';
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

      <FooterSection />
    </div>
  );
}