import { showDevConsoleInstructions } from "./instructions";

describe("#showDevConsoleInstructions", () => {
  it("It shows the proper info on Browser developers console", () => {
    const consoleSpy = jest.spyOn(console, "log");
    showDevConsoleInstructions();
    expect(consoleSpy).toHaveBeenCalledWith(
      "%cWellcome to Aylienzr !",
      "color: #bada55; font-weight: bold; font-size: 24px;"
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "%cFor analzing text you can use this string: `John is a very good football player!`",
      "color: #DB7093; font-weight: bold; font-size: 16px;"
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "%cFor analzing an URL try with: `http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate`",
      "color: #DB7093; font-weight: bold; font-size: 16px;"
    );
  });
});
