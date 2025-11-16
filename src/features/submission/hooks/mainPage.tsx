import { FooterSection } from '~/features/home/components/footerSection';
import { Header } from '~/features/home/components/hederSection';
import { Navigation } from '~/components/ui/navigation';
import { SubmissionMe } from '~/features/submission/components/submissionMe';

export function MainPage() {
  return (
    <>
      <Navigation />
      <Header />
      <SubmissionMe />
      <FooterSection />
    </>
  );
}