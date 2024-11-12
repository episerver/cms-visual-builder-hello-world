import Link from "next/link";

export default function NotFound() {
  return (
    <div className="outer-padding flex-1 items-center flex">
      <div className="container">
        <div className="col-12 lg:col-6">
          <p className="text-overline mb-8">Error 404</p>
          <h1 className="text-4xl font-medium leading-relaxed">Whoops! Page not found</h1>
          <h5 className="text-subtitle leading-relaxed mb-8">Sorry, the page you're looking for cannot be found.</h5>
          <p className="text-body leading-relaxed text-mischka mb-12">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" className="px-3 py-2 inline-block bg-santas-gray rounded-md ">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
