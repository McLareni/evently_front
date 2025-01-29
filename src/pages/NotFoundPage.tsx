import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center gap-8 `}>
      <h1>404 Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="bg-secondary text-sm p-2 rounded-lg hover:bg-yellow-500"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
