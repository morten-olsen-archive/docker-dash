FROM node:16-buster as runtime
RUN \
  apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    # Electron runtime dependencies
    libasound2 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libx11-xcb1 \
    libxss1 \
    libxtst6 \
    # Xorg server and udev
    udev \
    xserver-xorg \
    xinit \
    xserver-xorg-input-libinput \
    x11-xserver-utils && \
  rm -rf /var/lib/apt/lists/* && \
  npm i -g electron

FROM node:16-buster as build
WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . /app
RUN yarn build

FROM runtime
ENV DISPLAY=:0
# ENV DBUS_SESSION_BUS_ADDRESS="unix:path=/tmp/dbus-session-bus"

COPY --from=build /app/build/dist /app
COPY .xserverrc /root/.xserverrc
COPY .xinitrc /root/.xinitrc
COPY entry.sh /root/entry.sh

ENTRYPOINT [ "/root/entry.sh" ]
CMD xinit
