# Godot Universal Project Manager
A cross-version and cross-platform version for the Godot Game engine. Built in electron with react. 

**THIS IS NOT A COMPLETED PROJECT**

## 💖 Features
- [ ] 📂 Manage all of your godot projects from one place
- [ ] 📦 No annoying setup. Just download and run.
- [ ] 💽 Download and save all versions, including the latest betas.
- [ ] 🖌️ Easily create new projects
- [ ] 🐙 Github integration
- [ ] ⬆️ Update projects when new versions are released
- [ ] 🎨 Customizeable theme


## 🖥️ Install
Just download the binary corresponding to your version from the releases page.

## 🏃‍♂️ Quick Start
1. Go to config and setup the projects and versions folder. These should both be empty (yes, even if you already have a )
2. (Optional, but recommended) add the versions folder to your path [(wait, what's a path?)](https://en.wikipedia.org/wiki/PATH_(variable))
3. Import or create a new project. It's always recommended to import from github, but if neccessary you may import from local files.


## 📕 Info and FAQ
### Versions
All versions executables are saved in the following format:  
`godot_vX.X.X-{release}`  

If you added the versions folder to your system's path, you will be able to call godot executables using this 

### What is this `gump.json` file in my godot projects?
The `gupm.json` file informs this program what version to open the project in. It is created either when the project is imported for the first time or created. It's recommended that you do **NOT** `.gitignore` this file. 

### How do I change a project's version?
The easiest way is to click the arrow icon on the project and upgrade it to whatever version you want. You can also simply close it and gupm, change the `gupm.json`'s `version` property to whatever you desire, and reopen the project. This method can be used to downgrade a project, but that's not recommended.

### Why did you build this in electron?
While building it in Godot itself probably would have been the most comforable for me, it would limit doing cool things with the UI. I also needed to learn React and Electron anyways, so I thought this would be a good project to force me to. 

## 🔨 Contributor Guide
You will need to have node js installed. If you have no idea what you're doing or get stuck, dm FireSquid#8882 on discord. You can simply:
1. Clone the project using your preferred method of choice
2. Open it in your preferred IDE
3. Run `npm dev` (alternatively you can probably use pnpm or yarn if you'd like)
4. Push your changes to a new pull request
