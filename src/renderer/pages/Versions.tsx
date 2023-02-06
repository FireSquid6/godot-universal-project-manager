export default function Versions() {
  const handleClick = () => {
    fetch(
      'https://downloads.tuxfamily.org/godotengine/3.5/Godot_v3.5-stable_win64.exe.zip'
    )
      .then((response) => {
        return console.log(response);
      })
      .catch((_error) => {
        console.log('well crap');
      });
  };

  return (
    <>
      <h1>Versions</h1>
      <button type="button" onClick={handleClick}>
        Click me!
      </button>
    </>
  );
}
