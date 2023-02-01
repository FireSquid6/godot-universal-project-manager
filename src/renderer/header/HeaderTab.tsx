type Props = {
  url: string;
  title: string;
};

export default function Header({ url, title }: Props) {
  return (
    <div className="header-tab">
      <h2>
        <a href={url}>{title}</a>
      </h2>
    </div>
  );
}
