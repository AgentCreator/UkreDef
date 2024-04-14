#!/usr/bin/env bun .

import inquirer from "inquirer";

var prompt = "";
import puppeteer from "puppeteer";
import figlet from "figlet";

function convert(words: string) {
  if (/^([a-zA-Z]*)$/.test(words)) {
    return words;
  } else {
    var ans: Array<string> = [];
    const dictus = { а: "а", б: "b", в: "v", г: "gh", ґ: "g", д: "d", е: "e", є: "je", ж: "zh", з: "z", и: "y", і: "i", ї: "ji", й: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "c", ш: "sh", щ: "shh", ь: "j", ю: "ju", я: "ja",};
    words.split("").forEach((element) => {
      // @ts-ignore
      ans.push(dictus[element]);
    });
    // @ts-ignore
    return ans.join("");
  }
}

async function askWord() {
  const answers = await inquirer.prompt({
    name: "word",
    type: "input",
    message: "what word defenition do you need? ",
  });
  prompt = convert(answers.word);
}
await askWord();
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(`https://sum.in.ua/s/${prompt}`);
var def = await page.evaluate(
  // @ts-ignore
  () => document.querySelector("div[itemprop]")?.innerText
);
if (def) {
  console.log("\n\n" + def + "\n\n");
} else {
  console.clear();
  figlet.text(
    `"${prompt}" isn't a word.`,
    {
      font: "Isometric4",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );
}
await browser.close();