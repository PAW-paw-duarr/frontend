import { Header } from './components/hederSection';
import { TItleSection } from './components/titleSection';
import { Navigation } from '~/components/ui/navigation';

export function MainPage() {
  return (
    <>
      <Navigation className="fixed top-0 right-0 left-0 z-50" />
      <Header />
      <TItleSection />
    </>
  );
}
