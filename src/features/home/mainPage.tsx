import { FooterSection } from './components/footerSection';
import { Header } from './components/hederSection';
import { Navigation } from '~/components/ui/navigation';
import { TitleSection } from './components/titleSection';

export function MainPage() {
  return (
    <>
      <Navigation />
      <Header />
      <TitleSection />
      <FooterSection />
    </>
  );
}
