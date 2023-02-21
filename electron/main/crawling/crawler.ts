import axios from "axios";
import cheerio from "cheerio";
import * as fs from "fs";

export default async function crawl(
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

    console.log("\nGetting page html for " + currentUrl + " ...");
    pageHtml = await axios
      .get(currentUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("An error occurred while trying to get the page html");
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
          console.log(`${link} added to stack (${toVisit.length})`);
        } else {
          downloads.push(link);
          console.log(`${link} added to downloads`);
        }
      }
    });
  }

  fs.writeFileSync("downloads.json", JSON.stringify(downloads));
  return downloads;
}

let downloads = crawl();
