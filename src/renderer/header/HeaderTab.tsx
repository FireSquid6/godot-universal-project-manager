import { Link } from 'react-router-dom';

type Props = {
  url: string;
  title: string;
};

export default function HeaderTab({ url, title }: Props) {
  return (
    <Link to={url} className="header-tab">
      <h4>{title}</h4>
    </Link>
  );
}
