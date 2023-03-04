import crawl from "./crawler";
import { describe, expect, test } from "@jest/globals";

describe("test that the crawler works properly", () => {
  test("results is null when a bad url is given", async () => {
    expect(await crawl(false, "https://google.com")).toBeNull();
  });
});
