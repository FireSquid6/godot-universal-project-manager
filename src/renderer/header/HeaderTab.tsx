import { Link } from 'react-router-dom';

type Props = {
  url: string;
  title: string;
  route: string;
};

export default function HeaderTab({ url, title, route }: Props) {
  // poor solution. I am new to react. If you have a better solution to keeping track of the currently active header icon and appending the icon class, please tell me.
  let classes: string = 'header-tab ';

  if (url === route) {
    classes += 'active';
  }

  return (
    <Link to={url} className={classes}>
      <h4>{title}</h4>
    </Link>
  );
}
