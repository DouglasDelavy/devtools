# Devtools

A Fivem menu of tools for developers and server administrators.

This resource was designed to speed up your development.

## Features

- Interactive menu with several features such as Entity, Vehicle, Animations and Weathers.

- Terminal to execute client natives.

- Teleport to save your locations, and set your spawn point.

- Noclip, using own camera instead player gameplay camera.

- Permissions support to allow/deny all this features, using Fivem access control.

## Installation

### Build yourself

1. Clone this repository.

2. Execute the build script.

```bash
yarn build
```

3. Start this resource.

## How to use:

Setup your permissions:

1. Move or copy the `permissions.example.cfg` to the same folder where your `server.cfg` file is located.

2. Rename `permissions.example.cfg` to `permissions.cfg`.

3. Go to your `server.cfg` and add `exec permissions.cfg`.

### Commands

- `menu` - Display/Hide the menu.
- `cl_debugger` - Display/Hide utilities informations in screen
- `crun` - Run client natives passing in arguments of this command.
- `noclip` - Enable/Disable noclip.

## Preview

<details>
  <summary><b>Entity screen</b></summary>
  
  ![Entity screen](.github/images/entity.png 'Entity screen')
</details>

<details>
  <summary><b>World screen</b></summary>
  
  ![World screen](.github/images/world.png 'World screen')
</details>

<details>
  <summary><b>Teleport screen</b></summary>
  
  ![Teleport screen](.github/images/teleport.png 'Teleport screen')
</details>

<details>
  <summary><b>Animation screen</b></summary>
  
  ![Animation screen](.github/images/animation.png 'Animation screen')
</details>

<details>
  <summary><b>Console screen</b></summary>
  
  ![Console screen](.github/images/console.png 'Console screen')
</details>

<details>
  <summary><b>Debugger</b></summary>
  
  ![Debugger](.github/images/debugger.png 'Debugger')
</details>
