import { List } from "react-bootstrap-icons";

export default function parseUrl(url: string): Object | null {
  // parses a tuxfamily url and returns either null or an object containing the version, platform, and release of the godot version
  // example: https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip
  // returns: { version: "2.0.3", os: "osx64", release: "stable" }

  // define interfaces
  interface UrlData {
    mono: boolean;
    os: string;
    version: string;
    release: string;
    link: string;
  }
  const data: UrlData = {
    mono: false,
    os: "",
    version: "",
    release: "",
    link: "",
  };

  // first, ensure that the url is actually a godot download url
  if (
    url.includes("txt") ||
    url.includes("md") ||
    url.includes("tar") ||
    url.includes("tpz") ||
    url.includes("demos") ||
    !url.includes("godotengine") ||
    !url.includes("zip")
  ) {
    return null;
  }

  // if the url has the word "mono" in it, it probably is for a mono version
  data.mono = url.includes("mono");

  // the words "alpha", "beta", "rc", and "stable" can be used to indicate the release
  // TODO: make this code not terrible
  if (url.includes("stable")) {
    data.release = "stable";
  } else if (url.includes("pre-alpha")) {
    data.release = "pre-alpha";
  } else {
    // since releases other than stable may have a number after them, we need to figure out the specific beta, rc, or alpha iteration
    // first, we need to find the index of the release word
    const possibleReleases = ["alpha", "beta", "rc"];
    let i = 0; // the index to start reading the number at
    possibleReleases.forEach((release) => {
      if (url.includes(release)) {
        data.release = release;
        i = url.indexOf(release) + release.length;
        return;
      }
    });

    // now keep getting numbers until we reach a non-number
    while (!isNaN(parseInt(url.charAt(i)))) {
      data.release += url.charAt(i);
      i++;
    }
  }

  // the version can always be found after /godotengine/ in the url
  data.version = url.split("/godotengine/")[1].split("/")[0];

  // some os's have variable executable types, so this dictionary is used to map them to the correct os
  const osKey = {
    win32: ["win32"],
    win64: ["win64"],
    osx: ["osx"],
    linux64: ["x86_64", "x11.64"],
    linux32: ["x86_32", "x11.32"],
    android: ["apk"],
  };

  let key: string;
  let values: string[];
  for ([key, values] of Object.entries(osKey)) {
    values.forEach((os) => {
      if (url.includes(os)) {
        data.os = key;
        return;
      }
    });
  }

  // the link is just the url
  data.link = url;
  return data;
}
