# Terminal Commands for UmSicht & Blixxum

* **`um new project`**
   * Creates a new project in the version control and downloads it.
   * `um new clientXY` would create a new project for clientXY, download it and open it in the editor.
* **`um status project`**
   * Outputs the status on stage and live of a given project.
   * `um status umsicht` would output time of last change, the author and files affected of the project.
* **`um browse project`**
   * Opens the project in the default browser on the operating system.
   * `um browse umsicht` open umsicht in the default browser with the root of the webserver in mind.
* **`um down project`**
   * Downloads a project from the version control to work on it locally.
   * `um down umsicht` would download the umsicht project and open it in the editor.
* **`um update project`**
   * Updates a local project with the latest state from the version control.
   * `um update umsicht` would update the umsicht project and open it in the editor.
* **`um dev project`** or **`um pre project`**
   * Uploads the changes to the version control and updates the dev.umsicht.eu/project.
   * It *does not* push anything to a live server!
* **`um push project`**
   * Uploads the changes to the version control to and updates the dev.umsicht.eu/project.
   * It *does also* push anything to a live server!
* **`um revert project`**
   * Resets locally made changes to last version control's last state.
   * Meaning it reverts to the state of the last `dev`, `pre` or `push` command.
* **`um reset project`**
   * Deletes a local project and downloads it again.
   * More hardcore than revert in cases where things have gone crazy wrong.
* **`um config project username password url`**
   * Configures a local project with credentials needed to push (via FTP) to a live server.
* **`um work project dev`** or **`um work project pre`**
   * Changes a local project to work on a dev or pre version.

![Environments & Commands](../../app/img/posts/umsicht-terminal-commands.jpg)
