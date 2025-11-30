import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t border-gray-200 px-5 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Links */}
        <div className="flex justify-center items-center gap-2 mb-8 flex-wrap">
          <a 
            href="https://excited-thyme-80b.notion.site/Privacy-Policy-2b64ba773e9680d894bfdf91dd8851dd?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#1A73E8] transition-colors px-3 py-1"
          >
            {t.footer.privacyPolicy}
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="https://excited-thyme-80b.notion.site/Terms-of-Service-2b64ba773e9680af84e4c9625603a229?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#1A73E8] transition-colors px-3 py-1"
          >
            {t.footer.termsOfService}
          </a>
          <span className="text-gray-400">|</span>
          <a 
            href="mailto:a2487806918@gmail.com"
            className="text-gray-600 hover:text-[#1A73E8] transition-colors px-3 py-1"
          >
            {t.footer.contactUs}
          </a>
        </div>

        {/* Disclaimers */}
        <div className="space-y-4 mb-8 text-xs text-gray-500 leading-relaxed">
          <p>
            {t.footer.earningsDisclaimer}
          </p>
          
          <p>
            <span className="font-semibold">{t.footer.notFacebook}</span> {t.footer.facebookDisclaimer}
          </p>
          
          <p>
            {t.footer.guaranteeDisclaimer}
          </p>
        </div>

        {/* Copyright & Contact */}
        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm">
            {t.footer.copyright}
          </p>
          <p className="text-gray-500 text-xs">
            {t.footer.contact}
          </p>
        </div>
      </div>
    </footer>
  );
}