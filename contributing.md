
# Contributing to snes-wasm

Hi o/





## Contents

- [Basic Information](#basic-information)
	- [Tooling](#tooling): Information about what tools are used in this project.
	- [SNES Technical Information Resources](#snes-technical-information-resources): Links to more technical information about the SNES itself.
	- [What this project should do](#what-this-project-should-do)
	- [What this project should not do](#what-this-project-should-not-do)
- [Technical Information](#technical-information)
	- [Project Structure](#project-structure): Where to find stuff in the repo
	- [Building the Project](#building-the-project)
- [How to Contribute](#how-to-contribute)





## Basic Information

### Tooling

- [AssemblyScript](https://docs.assemblyscript.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)





### SNES Technical Information Resources

- [Wikipedia](https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System#Technical_specifications)
- [WDC 65816 Programming Manual](./assembly/cpu/wdc_65816_programming_manual.pdf)
- [SuperFamicon Development Wiki](https://wiki.superfamicom.org/)
- [WikiBooks: Super NES Programming](https://en.wikibooks.org/wiki/Super_NES_Programming)
- [SNESLAB Wiki](https://sneslab.net/wiki/)
- [SNES dev Wiki](https://snesdev.mesen.ca/wiki/index.php?title=Main_Page)





### What this project should do

Emulate the hardware of the SNES console (and cartridges), allowing it to run software written for the SNES (ie. ROM files).

Additionally, it should expose ways to access most all infomation stored inside the wasm instance, and provide ways to interface with that information, for the purpose of enabling additional tools to connect to the emulator. (For example: ways to connect to controller input, ways to read video output, or more broadly, the ability to write plugins or tools like debuggers, memory inspectors, etc).





### What this project should not do

Provide a UI. This is meant to be a core engine that can be used by applications. It should not actually provide an application. Things like actually rendering video to display, or playing audio, accepting inputs, etc. should not be here.

At some point, once this project is more underway, a new project can be started up that actually embeds `snes-wasm` into it. But that will be a separate project, not in this repo.





## Technical Information

### Project Structure

- `./assembly`: Contains all of the AssemblyScript for the actual emulator. Builds to `./build/wasm/snes.wasm`.
	- For the most part, the assembly is broken down into directories representing the various pieces of hardware to be emulated.
	- `./assembly/mem.ts` contains the code for managing memory inside the wasm instance.
	- `./assembly/index.ts` contains the exported methods called by JavaScript.
- `./lib`: Contains all of the TypeScript for the API library that loads the WebAssembly and provides an interface into the emulator. Builds to `./build/lib/*`.
- `./scripts`: Build scripts and the like; Things developers on the project might call
- `./tests`: Nothing yet... >_> will eventually have unit tests





### Building the project

Install Dependencies:

```bash
$ npm install
```

Build WebAssembly:

```bash
$ npm run build:wasm
```

Build JavaScript:

```bash
$ npm run build:lib
```
**TODO:** Do we need more here?




## How to Contribute

This project is still in early development. As such, there is a lot of code that needs to be written, but not a whole lot else.

I'm currently working on writing up a list of what all actually needs to get done, and I will update this document when that exists.

### Bug Reports

N/A for the time being.

**TODO:** Update this document once the project is at a maturity level that bug reports actually make sense.

### Contributing Code

Pull Requests are welcome. Once the list of things to be done is written up, there will be a maintained list in the GitHub issues list. If you find one that sounds like something you want to work on, leave a comment to let me know you're looking at it, and feel free to ask questions, and send a Pull Request when you're done.

**TODO:** Update this once CI is setup with build / lint checks.

#### General Points

- Tabs (not spaces) in source code files, please
- Comments. Many comments. Technical documentation is hard to find, so please document information here thouroughly (code comments, readme files, links, whatever documentation can be added)
