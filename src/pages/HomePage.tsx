import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import CapabilityCards from '../components/home/CapabilityCards';
import CertificationSection from '../components/home/CertificationSection';
import InstallationCases from '../components/home/InstallationCases';
import type { CmsState } from '../types/cms';

export default function HomePage() {
  const { content } = useOutletContext<CmsState>();

  return (
    <>
      <HeroSection hero={content.hero} />
      <CertificationSection items={content.certifications} />
      <CapabilityCards />
      <InstallationCases cases={content.caseStudies} />
    </>
  );
}
