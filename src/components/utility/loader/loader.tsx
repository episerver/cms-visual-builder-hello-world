
export const Loader: React.FC<{ global?: boolean; translucent?: boolean }> = ({ global = false, translucent = false }) => {
  return (
    <div className={`loading ${global ? "loading__global" : ""} ${translucent ? "loading__translucent": ""}`}>
      <span className="circle" />
      <span className="circle" />
      <span className="circle" />
    </div>
  );
};
