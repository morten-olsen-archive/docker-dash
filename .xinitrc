#!/bin/sh

if [ -n "$XRANDR_ARGS" ]; then
  xrandr $XRANDR_ARGS
fi

xset -dpms
xset s off
xset s noblank

electron --no-sandbox /app/electron/index.js
