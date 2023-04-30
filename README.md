# GigaWatch CLI

## A multi-language watch-mode cli tool powered by Nodemon
<div>
<img width="100%" align="center"
    style="
           margin-left: auto;
           margin-right: auto;
           width: 70%;"
    src="https://s11.gifyu.com/images/gw2.gif" 
    alt="Our logo">
</img>
</div>

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

### Command Line Arguments

Alternatively, You can skip the CLI prompts by passing in command argument flags

#### Compiler Option (REQUIRED)
<table>
  <tr>
    <td>Flag</td>
    <td>Language</td>
  </tr>
  <tr>
    <td> -j</td>
    <td>JavaScript</td>
    
  </tr>
  <tr>
    <td> -t</td>
    <td>TypeScript</td>
  </tr>
  <tr>
    <td> -p </td>
    <td>Python</td>
  </tr>
  <tr>
    <td> -l </td>
    <td>Lua</td>
  </tr>
 
</table>

#### File Path (REQUIRED)
<table>
  <tr>
    <td>Flag</td>
    <td>Description</td>
  </tr>
  <tr>
    <td> -f</td>
    <td>Relative location of the file you want GW to watch</td>
    
  </tr>


</table>

 #### Clean Mode (OPTIONAL)
 
<table>
  <tr>
    <td>Flag</td>
    <td>Description</td>
  </tr>
  <tr>
    <td> -c</td>
    <td>Enables Clean Mode</td>
    
  </tr>
  </table>
  
  ### Example of CL Arguments 
  ```
  gigawatch -t -f ./index.ts -c
  ```
