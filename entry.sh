#!/bin/bash
function init()
{
  # echo error message, when executable file is passed but doesn't exist.
  if [ -n "$1" ]; then
    if CMD=$(command -v "$1" 2>/dev/null); then
      shift
      exec "$CMD" "$@"
    else
      echo "Command not found: $1"
      exit 1
    fi
  fi
}

unshare --net /lib/systemd/systemd-udevd --daemon &> /dev/null
udevadm trigger &> /dev/null
init "$@"
