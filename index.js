#! /usr/bin/env node

const { program } = require("commander");
const csv = require("csv-parser");
const results = [];
const fs = require("fs");
const clone = require("git-clone/promise");
const chalk = require("chalk");
const { Octokit } = require("@octokit/core");
require("dotenv").config();

program
  .command("gitclone <filename>")
  .description("Clone the repositories")
  .action(gitclone);

function gitclone(filename) {
  fs.createReadStream(`./${filename}`)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log();
      console.log(chalk.green.bold("Cloning Repositories..."));

      for (let index = 0; index < results.length; index++) {
        const name1 = results[index].name;
        const repo1 = results[index].repo;

        clone(repo1, `./repos/${name1}`);
      }
    });
}

program
  .command("chkver <filename> <depend> <ver>")
  .description(
    "Check the version of dependency is greater then the given version. Takes filename dependecy name and version as input."
  )
  .action(chkver);

function chkver(filename, depend, ver) {
  fs.createReadStream(`./${filename}`)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // console.log(results);
      console.log();

      for (let index = 0; index < results.length; index++) {
        const name1 = results[index].name;
        const repo1 = results[index].repo;

        const config = require(`./repos/${name1}/package.json`);
        if (config.dependencies[depend].slice(1) >= ver) {
          console.log(
            chalk.green.bold(
              name1,
              "  |  ",
              repo1,
              "  |  ",
              config.dependencies[depend].slice(1),
              "  |  ",
              "true"
            )
          );
        } else {
          console.log(
            chalk.red.bold(
              name1,
              "  |  ",
              repo1,
              "  |  ",
              config.dependencies[depend].slice(1),
              "  |  ",
              "false"
            )
          );
        }
      }
    });
}

program
  .command("forker <filename> <depend> <ver>")
  .description("Fork the repositories in your github account")
  .action(forker);

function forker(filename, depend, ver) {
  fs.createReadStream(`./${filename}`)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // console.log(results);
      console.log();
      for (let index = 0; index < results.length; index++) {
        const name1 = results[index].name;
        const repo1 = results[index].repo;

        const config = require(`./repos/${name1}/package.json`);

        if (config.dependencies[depend].slice(1) < ver) {
          var pathname = new URL(repo1).pathname;
          var newUrl = pathname.split("/");
          //   console.log(newUrl[2]);

          const octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN,
          });

          forker(newUrl[2], newUrl[1]);

          async function forker(repo, name) {
            console.log(
              chalk.blue.bold(
                "Forking",
                repo,
                "to your github account from",
                name
              )
            );
            await octokit.request("POST /repos/{owner}/{repo}/forks", {
              owner: name,
              repo: repo,
            });
          }
        }
      }
    });
}

program
  .command("makepr <filename> <depend> <ver> <head1>")
  .description("Fork the repositories in your github account")
  .action(makepr);

function makepr(filename, depend, ver, head1) {
  fs.createReadStream(`./${filename}`)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // console.log(results);
      console.log();
      console.log(
        chalk.blue.bold("Creating Pull Requests for depreciated versions...")
      );
      for (let index = 0; index < results.length; index++) {
        const name1 = results[index].name;
        const repo1 = results[index].repo;

        const config = require(`./repos/${name1}/package.json`);

        if (config.dependencies[depend].slice(1) < ver) {
          var pathname = new URL(repo1).pathname;
          var newUrl = pathname.split("/");
          //   console.log(newUrl[2]);

          const octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN,
          });

          makepullreq(newUrl[1], newUrl[2], head1);
          async function makepullreq(uname, urepo, head2) {
            const response = await octokit.request(
              "POST /repos/{owner}/{repo}/pulls",
              {
                owner: uname,
                repo: urepo,
                title: "Dependency version updated",
                head: head2,
                base: "main",
              }
            );
            console.log(urepo, "  |  ", response.data.html_url);
          }
        }
      }
    });
}

program.parse();
