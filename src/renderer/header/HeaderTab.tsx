type Props = {
  url: string;
  title: string;
};

export default function HeaderTab({ url, title }: Props) {
  return (
    <a href={url} className="header-tab">
      <h2>{title}</h2>
    </a>
  );
}
