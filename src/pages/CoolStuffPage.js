import HaloBackground from '../components/HaloBackground';
import './CoolStuffPage.css';
import GlassmorphicCarousel from '../components/GlassmorphicCarousel'

export default function CoolStuffPage() {
  return (
    <HaloBackground children={
      <GlassmorphicCarousel />
    } />
  );
}
