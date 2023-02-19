export default function parseUrl(url: string): Object | null {
  // parses a url and returns either null or an object containing the version, platform, and release of the godot version
  // example: https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip
  // returns: { version: "2.0.3", os: "osx64", release: "stable" }
  
  interface UrlData {
    mono: boolean;
    os: string;
    version: string;
    release: string;
  }
  const data: UrlData = {
    mono: false,
    os: "",
    version: "",
    release: "",
  };

  // remove the non-useful parts of the url (https://downloads.tuxfamily.org/godotengine/)
  const words: string[] = url.split("/");
  words.splice(0, 3);
  console.log(words)

  let version: string, filename: string, os: string, release: string;

  data.mono = (words.includes("mono")) 
  

  // make sure that the filename isn't something weird like a text, readme file, template file, or other non-executable
  if (url.includes("txt") || url.includes("md") || url.includes("tar") || url.includes("tpz")) return null;


  return null;
}

console.log(parseUrl("https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip"));