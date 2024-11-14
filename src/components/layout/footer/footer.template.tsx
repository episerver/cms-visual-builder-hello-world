export interface FooterTemplateProps {}

export const FooterTemplate: React.FC<FooterTemplateProps> = () => {
  return (
    <footer className="pt-32 pb-8 outer-padding">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} My Company</p>
      </div>
    </footer>
  );
};
