# GigaWatch CLI

## A multi-language watch-mode cli tool powered by Nodemon

### System Requirements:
- Node
- Linux OS (No Windows/OSX Support as of right now)

### Supported Interpreters/Compilers:
- node
- ts-node
- python3
- lua

GigaWatch expects the interpreters and compilers to be accessible via their common $PATH command names (e.g python3, node, ts-node)
If it doesn't detect the command, it will ask you for permission to install it for you. 



### Installation

It is recommended to install it globally
```
npm install -g gigawatch
```
### Usage
GW has only one command which will open the CLI
```
gigawatch

## or the alias

gw
```
