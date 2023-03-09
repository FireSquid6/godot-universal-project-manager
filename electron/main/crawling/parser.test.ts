import { parseUrl } from "./parser";
import { describe, expect, test } from "@jest/globals";

describe("test that the parser works properly", () => {
  test("test that old versions are found properly", () => {
    expect(
      parseUrl(
        "https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip"
      )
    ).toStrictEqual({
      os: "osx",
      version: "2.0.3",
      release: "stable",
      mono: false,
      link: "https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip",
    });
  });

  test("then test that new versions are found properly", () => {
    expect(
      parseUrl(
        "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_win64.exe.zip"
      )
    ).toStrictEqual({
      os: "win64",
      version: "4.0",
      release: "rc2",
      mono: false,
      link: "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_win64.exe.zip",
    });
  });

  test("return null if an export template is found", () => {
    expect(
      parseUrl(
        "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_export_templates.tpz"
      )
    ).toBeNull();
  });

  test("return null if a readme file is found", () => {
    expect(
      parseUrl("https://downloads.tuxfamily.org/godotengine/4.0/rc2/README.txt")
    ).toBeNull();
  });
});
