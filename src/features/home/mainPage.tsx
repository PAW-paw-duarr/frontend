import { FooterSection } from './components/footerSection';
import { Header } from './components/hederSection';
import { TItleSection } from './components/titleSection';
import { Navigation } from '~/components/ui/navigation';

export function MainPage() {
  return (
    <>
      <Navigation />
      <Header />
      <TItleSection />
      <FooterSection />
    </>
  );
}
