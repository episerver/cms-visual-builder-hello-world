import clsx from "clsx";

export const Loader: React.FC<{ global?: boolean }> = ({ global = false }) => {
  return (
    <div
      className={clsx({
        loader: true,
        "loader-global": global,
      })}
    >
      <span className="circle" />
      <span className="circle" />
      <span className="circle" />
    </div>
  );
};
