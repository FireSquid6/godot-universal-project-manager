const parseUrl = require("./parser");

test("tests the parsing url feature", () => {
  expect(
    parseUrl(
      "https://downloads.tuxfamily.org/godotengine/2.0.3/Godot_v2.0.3_stable_osx64.zip"
    )
  ).toBe({
    os: "osx64",
    version: "2.0.3",
    release: "stable",
    mono: false,
  });
  expect(
    parseUrl(
      "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_win64.exe.zip"
    )
  ).toBe({
    os: "win64",
    version: "4.0",
    release: "rc2",
    mono: false,
  });
  expect(
    parseURL(
      "https://downloads.tuxfamily.org/godotengine/4.0/rc2/Godot_v4.0-rc2_export_templates.tpz"
    ).toBe(null)
  );
  expect(
    parseURL(
      "https://downloads.tuxfamily.org/godotengine/4.0/rc2/README.txt"
    ).toBe(null)
  );
});
s;
