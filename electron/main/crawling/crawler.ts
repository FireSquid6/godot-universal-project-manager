import axios from "axios";
import cheerio from "cheerio";
import * as fs from "fs";

export default async function crawl(
  shallow: boolean,
  url = "https://downloads.tuxfamily.org/godotengine/",
  exclude = ["media", "patreon", "testing", "toolchains", "../"]
) {
  // crawls the url "https://downloads.tuxfamily.org/godotengine/" and returns an array of all the urls on the site
  // will always ignore the urls in the exclude array

  // first, ensure that the url is a tuxfamily url
  if (!url.includes("https://downloads.tuxfamily.org/godotengine")) return null;

  const toVisit: string[] = [url];
  const visited: string[] = [];
  const downloads: string[] = [];

  while (toVisit.length > 0) {
    let currentUrl: string = toVisit.pop()!;
    visited.push(currentUrl);

    let pageHtml: string;

    pageHtml = await axios
      .get(currentUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return "error, axios failed";
      });

    const $ = cheerio.load(pageHtml);

    // get all the links on the page
    $("a").each((i: number, elem: any) => {
      let link: string = currentUrl + $(elem).attr("href")!;

      // make sure that nothing excluded is in the link
      let is_included: boolean = true;
      exclude.forEach((excluded) => {
        if (link.includes(excluded)) {
          is_included = false;
        }
      });

      if (!visited.includes(link) && !toVisit.includes(link) && is_included) {
        if (link.charAt(link.length - 1) == "/") {
          toVisit.push(link);
        } else {
          downloads.push(link);
        }
      }
    });

    if (shallow && visited.length > 5) {
      return downloads;
    }
  }

  return downloads;
}
