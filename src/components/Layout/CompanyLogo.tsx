
import { Link } from 'react-router-dom';

const CompanyLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="https://www.astroideasoftway.com/assets/img/logo.png" 
        alt="Astroidea Softway Logo" 
        className="h-8" 
      />
    </Link>
  );
};

export default CompanyLogo;
