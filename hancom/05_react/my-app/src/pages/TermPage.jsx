import { useParams } from 'react-router-dom';
import { terms } from '../data/terms';
import './TermPage.css';

const TermPage = () => {
  const { id } = useParams();
  const term = terms.find((t) => t.id === Number(id));

  if (!term) return <p>용어를 찾을 수 없어요.</p>;

  return (
    <div className="term-page">
      <h1>{term.name}</h1>
      <p>{term.short}</p>
    </div>
  );
};

export default TermPage;
