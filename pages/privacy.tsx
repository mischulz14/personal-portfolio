import Navbar from '@/components/navbar/Navbar';
import Logo from '@/components/svgs/Logo';
import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function MyComponent() {
  const router = useRouter();
  const currentLanguage = router.locale; // The language right here
  const colorContext = useContext(ColorThemeContext);

  const componentToRender = {
    en: <PrivacyPolicyEN />,
    de: <PrivacyPolicyDE />,
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center !overflow-auto">
      <NextLink
        href="/"
        passHref
        className="border-2 rounded-full border-white/20 p-3"
      >
        <Logo width="50px" height="50px" color={colorContext.colorThemeColor} />
      </NextLink>
      {currentLanguage &&
        componentToRender[currentLanguage as keyof typeof componentToRender]}
    </div>
  );
}

const PrivacyPolicyEN = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto text-white/80">
      <h1 className="text-2xl font-bold mb-4">
        Privacy Policy for michaelschulz.dev
      </h1>
      <p className="mb-2">
        <strong>Last Updated:</strong> 25.12.2023
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to michaelschulz.dev. This privacy policy explains how I
        collect, use, and protect your personal information when you use my
        website and interact with me through my email form.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Information Collection</h2>
      <p className="mb-4">
        We collect the following information:
        <br />- <strong>Name</strong>: To identify and communicate with you.
        <br />- <strong>Contact Information</strong>: Including email address or
        phone number, to respond to your inquiries.
        <br />- <strong>Message Content</strong>: The content of your message to
        address your queries or feedback.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Use of Information</h2>
      <p className="mb-4">
        Your information is used for the following purposes:
        <br />- <strong>Communication</strong>: To respond to your inquiries and
        communicate with you.
        <br />- <strong>Website Improvement</strong>: To enhance the user
        experience on my website.
        <br />- <strong>Legal Compliance</strong>: To comply with applicable
        laws and regulations.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        4. Protection of Information
      </h2>
      <p className="mb-4">
        I am committed to protecting your information. I implement appropriate
        technical and organizational measures to safeguard your data from
        unauthorized access, alteration, disclosure, or destruction.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. User Rights</h2>
      <p className="mb-4">
        You have the right to access, correct, or delete your personal
        information that I hold. Please contact me if you wish to exercise these
        rights.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. Changes to This Policy</h2>
      <p className="mb-4">
        We reserve the right to modify this privacy policy at any time. Any
        changes will be posted on my website. We encourage you to periodically
        review this policy.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Contact Information</h2>
      <p>
        For any questions or concerns regarding your privacy, please contact me
        at michaelschulz@michaelschulz.tech
      </p>
    </div>
  );
};

const PrivacyPolicyDE = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto text-white/80">
      <h1 className="text-2xl font-bold mb-4">
        Datenschutzrichtlinie für michaelschulz.dev
      </h1>
      <p className="mb-2">
        <strong>Zuletzt aktualisiert:</strong> 25.12.2023
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Einführung</h2>
      <p className="mb-4">
        Willkommen bei michaelschulz.dev. Diese Datenschutzrichtlinie erläutert,
        wie ich Ihre persönlichen Informationen sammel, verwende und schütze,
        wenn Sie meine Website nutzen und über mein E-Mail-Formular mit mir
        interagieren.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Datenerfassung</h2>
      <p className="mb-4">
        Ich sammel folgende Informationen:
        <br />- <strong>Name</strong>: Zur Identifikation und Kommunikation mit
        Ihnen.
        <br />- <strong>Kontaktinformationen</strong>: Einschließlich
        E-Mail-Adresse oder Telefonnummer, um auf Ihre Anfragen zu antworten.
        <br />- <strong>Inhalt der Nachricht</strong>: Der Inhalt Ihrer
        Nachricht, um Ihre Anfragen oder Rückmeldungen zu bearbeiten.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        3. Verwendung der Informationen
      </h2>
      <p className="mb-4">
        Ihre Informationen werden für folgende Zwecke verwendet:
        <br />- <strong>Kommunikation</strong>: Um auf Ihre Anfragen zu
        antworten und mit Ihnen zu kommunizieren.
        <br />- <strong>Verbesserung der Website</strong>: Um das
        Benutzererlebnis auf meiner Website zu verbessern.
        <br />- <strong>Rechtskonformität</strong>: Um geltende Gesetze und
        Vorschriften einzuhalten.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        4. Schutz der Informationen
      </h2>
      <p className="mb-4">
        Ich verpflichte mich, Ihre Informationen zu schützen. Ich implementiere
        geeignete technische und organisatorische Maßnahmen, um Ihre Daten vor
        unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Benutzerrechte</h2>
      <p className="mb-4">
        Sie haben das Recht, auf Ihre persönlichen Informationen, die ich
        speichere, zuzugreifen, sie zu korrigieren oder zu löschen. Bitte
        kontaktieren Sie mich, wenn Sie diese Rechte ausüben möchten.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        6. Änderungen dieser Richtlinie
      </h2>
      <p className="mb-4">
        Ich behalte mir das Recht vor, diese Datenschutzrichtlinie jederzeit zu
        ändern. Änderungen werden auf meiner Website veröffentlicht. Ich
        empfehlen Ihnen, diese Richtlinie regelmäßig zu überprüfen.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Kontaktinformationen</h2>
      <p>
        Für Fragen oder Bedenken bezüglich Ihrer Privatsphäre kontaktieren Sie
        mich bitte unter michaelschulz@michaelschulz.tech
      </p>
    </div>
  );
};
