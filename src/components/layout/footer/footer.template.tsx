import { LogoTemplate } from "@components/partials/logo/logo.template";

export interface FooterTemplateProps {}

export const FooterTemplate: React.FC<FooterTemplateProps> = () => {
  return (
    <footer className="outer-padding site-footer">
      <div className="container">
        <div className="flex py-4">
          <img src={`/assets/images/opti-logo-only.svg`} alt={"Optimizely Brand Logo"} className="w-12 h-12" />
        </div>
        <div className="flex py-4 gap-4 site-footer__copyright">
          <span>© {new Date().getFullYear()} Optimizely</span>
        </div>
      </div>

      {/* <div className="row lg:justify-between">
            <div className="col-12 lg:col-2">
              <section>
                {addressSection?.header && <h1 className="primary-footer__section-header">{addressSection.header}</h1>}
                <address
                  className="primary-footer__address"
                  dangerouslySetInnerHTML={{
                    __html: addressSection.content,
                  }}
                ></address>
              </section>
              {mounted && (
                <OptionDropdowns
                  currencies={currencies}
                  currencySelectionHeading={currencySelectionHeading}
                  showCurrencyDropdown={showCurrencyDropdown}
                  siteLanguages={siteLanguages}
                  siteLanguageSelectionHeading={siteLanguageSelectionHeading}
                />
              )}
            </div>
            {sections &&
              sections.map((section, index) => {
                return <FooterSection key={`section-type-${index}`} {...section} />;
              })}
          </div>
        </div>
        {mounted && (
          <BottomSection
            bottomLinks={bottomLinks}
            copyrightText={copyrightText}
            facebookUrl={facebookUrl}
            youTubeUrl={youTubeUrl}
            twitterUrl={twitterUrl}
            linkedInUrl={linkedInUrl}
          />
        )} */}
    </footer>
  );
};
