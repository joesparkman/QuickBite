import { useNavigate } from 'react-router-dom';

export default function SectionHeader({ title, to }) {
  const navigate = useNavigate();
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {to && <button className="link-button" onClick={() => navigate(to)}>View all</button>}
    </div>
  );
}