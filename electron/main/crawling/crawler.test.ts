import crawl from "./crawler";
import { describe, expect, test } from "@jest/globals";

describe("test that the crawler works properly", () => {
  test("return null if you try to crawl the wrong url", async () => {
    expect(await crawl("https://google.com")).toBeNull();
  });

  test("results includes old versions", async () => {
    expect(await crawl()).toContain(
      "https://downloads.tuxfamily.org/godotengine/3.0/Godot_v3.0-stable_x11.64.zip"
    );
  });
  test("results includes new versions", async () => {
    expect(await crawl()).toContain(
      "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_win64.exe.zip"
    );
  });
  test("results does not include export templates", async () => {
    expect(await crawl()).not.toContain(
      "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_export_templates.tpz"
    );
  });
  test("results does not include non-download links", async () => {
    expect(await crawl()).not.toContain(
      "https://downloads.tuxfamily.org/godotengine/3.4/"
    );
  });
});
