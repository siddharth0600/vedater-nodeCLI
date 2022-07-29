
# Vedater - DyteTask

A CLI tool to check the version of a dependency and to create a pull request if it is depreciated. Can be also used to clone and fork the repositories.




## Demo

[Click here](https://drive.google.com/drive/folders/1yPJC-TUJEvg7nU9zDFqDDGFRJxya4meC?usp=sharing) to access the video demo for the tool.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GITHUB_ACCESS_TOKEN`

[Click](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) here to know how to create a github access token.


`.env` file will look like this:


![App Screenshot](http://drive.google.com/uc?id=118n1dFDNhaddouy9VyA-fUek2b-WM_FP)

## Run Locally

Clone the project

```bash
  git clone https://github.com/dyte-submissions/dyte-vit-2022-siddharth0600
```

Go to the project directory

```bash
  cd dyte-vit-2022-siddharth0600
```

Install dependencies

```bash
  npm install
```




Install the CLI tool in your system. Make sure to add the `.env` file before executing this command.

```bash
  npm i -g
```


## Commands of CLI tool

### Clone
This command must be `Run First` in order for all the commands to work as it clones all the repos.\
And also add the `.csv` sample file inside the folder.\
 
filename : It is the name of the file which we have to feed
```bash
  vedater gitclone <filename>
```
Example:
```bash
  vedater gitclone sampleData.csv
```
![App Screenshot](http://drive.google.com/uc?id=1T6cseQLjsqJ1FmNA6-yBE82AnwmgLAc4)

### Check Version
This command will check the version of dependency with the given version.\
filename: It is the name of the file which we have to feed.\
depend: Name of the dependency to check.\
ver: Dependency version
```bash
  vedater chkver <filename> <depend> <ver>
```
Example:
```bash
  vedater chkver sampleData.csv axios 0.24.0
```
![App Screenshot](http://drive.google.com/uc?id=1mL0C5HeHvR0dks-aLyHjgZ6EsRkKd3gV)

### Fork
This command will fork the repositories in your own github account.

filename: It is the name of the file which we have to feed.\
depend: Name of the dependency to check.\
ver: Dependency version
```bash
  vedater forker <filename> <depend> <ver>
```
Example:
```bash
  vedater forker sampleData.csv axios 0.24.0
```
![App Screenshot](http://drive.google.com/uc?id=1xOrIGD8aQqjTZduYO3-4BZbNjEz1CmjW)

### Make Pull Request
This command will create a pull request for the depreciated dependency.\
Before executing this command run the `forker` command to fork the repository in your github account and make changes to the version of the dependency there.\
Afer that note the name of the branch from which we have to pull.


filename : It is the name of the file which we have to feed.\
depend: Name of the dependency to check.\
ver: Dependency version.\
branch: This is the branch from which we have to pull. Eg- `siddharth0600:main`
```bash
  vedater makepr <filename> <depend> <ver> <branch>
```
Example:
```bash
  vedater makepr sampleData.csv axios 0.24.0 siddharth0600:main
```
![App Screenshot](http://drive.google.com/uc?id=12jjLkt1gOHIb27uBx7BZ59WDAOyyUzue)
