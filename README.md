# startup-proxy

A simple proxy for starting up applications run `startup-proxy` instead of the target application to modify command line args. See examples below to get a better understanding why startup-proxy has been made.

Provide a `startup-proxy.json` alongside the app in order to define rules for command line arguments.

It is currently only tested in Windows environments.

## Examples

### MediathekView

MediathekView is an applicaton that lists everything available at the German public media libraries. It assumes you want to watch movies with VLC and thus provides the `--play-and-exit` command line argument. This command line argument can be incompatible with alternative players, e.g. Potplayer.

To get Potplayer working with MediathekView, place `startup-proxy.exe` inside the Potplayer's installation directory and provide the following `startp-proxy.json`:

```json
{
    "main-executable": "PotPlayerMini64.exe",
    "enable-logging": false,
    "rules": [
        {
            "rx": "--play-and-exit",
            "action": "remove-arg"
        }
    ]
}
```
