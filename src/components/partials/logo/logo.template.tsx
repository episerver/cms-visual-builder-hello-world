export const LogoTemplate: React.FC = () => {
  return (
    <div className="flex items-center">
      <a className="block" aria-label="Back to Optimizely Home Page" href="/">
        <img src={"/assets/images/opti-logo-full-white.svg"} alt={"Optimizely Brand Logo"} className="w-28 lg:w-auto relative" />
      </a>
    </div>
  );
};
