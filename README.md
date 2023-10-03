# VM-Repack-2154

VM-Repack-2154 is a simple command-line utility to edit a specific text file inside a zip file, make specified replacements, and repack it.

## Using Bun instead of Npm

### Install Bun
```sh
npm install -g bun
```

### Run
```sh
bunx github:cyfung1031/vm-repack-2154 -f /downloads/folder/Violentmonkey-beta-webext-v2.15.4.zip
```

## Direct Use (npx)

### GitHub Clone

```sh
npx github:cyfung1031/vm-repack-2154 -f Violentmonkey-beta-webext-v2.15.4.zip
```

```sh
npx github:cyfung1031/vm-repack-2154 -f /downloads/folder/Violentmonkey-beta-webext-v2.15.4.zip
```


### Local Folder

```sh
npx vm-repack-2154 -f Violentmonkey-beta-webext-v2.15.4.zip
```

```sh
npx vm-repack-2154 -f /downloads/folder/Violentmonkey-beta-webext-v2.15.4.zip
```

## Installation

To use this utility, you'll need to clone this repository to your local machine.

```sh
git clone https://github.com/cyfung1031/vm-repack-2154.git
cd vm-repack-2154
npm install
npm link
```

This will install all necessary dependencies and link the project to your global npm modules, allowing you to run the `vm-repack-2154` command from anywhere.

## Usage

```sh
vm-repack-2154 --file [path-to-zip-file] [options]
```

### Options

- `--file, -f` (required): The path to the zip file you want to edit.
- `--textFile, -t` (optional): The name of the text file to edit inside the zip file. Default is `options/index.js`.
- `--suffix, -s` (optional): Suffix to append to the original file name if provided.
- `--output, -o` (optional): Path to save the edited zip file. By default, it will override the original zip file.

### Example

```sh
vm-repack-2154 -f /downloads/folder/Violentmonkey-beta-webext-v2.15.4.zip
```

```sh
vm-repack-2154 --file /downloads/folder/Violentmonkey-beta-webext-v2.15.4.zip --suffix _modified
```

This will create a new zip file named `Violentmonkey-beta-webext-v2.15.4_modified.zip` in the same directory as the original zip file, with the specified text file edited as per the replacement rules defined.

## Replacements

The utility will make the following replacements in the specified text file inside the zip:

1. Replace all occurrences of `.readOnly` with `.ReadOnly`
2. Replace all occurrences of `readOnly` with `readOnlY`
3. Replace all occurrences of `.canEdit=!1` with `.canEdit=!0`

## Uninstallation

To uninstall VM-Repack-2154, navigate to the project's root directory and run:

```sh
npm unlink vm-repack-2154
npm uninstall -g vm-repack-2154
```

This will remove the global link to the package. After doing this, you can also delete the project folder if you no longer need it.

```sh
cd ..
rm -r vm-repack-2154
```

## Contributions

Feel free to fork the project, open a pull request, or report any issues or feature requests in the GitHub issues tab.

## License

This project is open-source, and it is available under the [MIT License](LICENSE).
