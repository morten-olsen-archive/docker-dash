# Security

Usually this would be the place I would tell you about the extra hardening that has been put in place to make it more secure, but that is not the case this time around.
In fact this is more of a disclamer, since i had to strip away some build in security in order to make this work

If you know about Docker and its sandboxing you would expect your application to run in a sandboxed environment, where the container is shielded from interacting with the host system except for excemptions that you may have added.

Since this project needs to run the X environment inside the container it needs access to a lot of the hardware stack such as graphics cards, input devices and the like. In fact it needs to trigger udev in order to ensure everything is setup correctly.

All of this means that the container has to run as "privileged", giving it what could be thought of as unrestricted host access. Additionally to make networking easier it uses the hosts network stack instead of a virtual docker bridge (Though this could be disabled in the `docker-compose.yml` file by removing `network_mode: host`) to make networking easier.

Also because the container needs to run elevated commands it has to be run as root.

So the bottom line to all of this is that this does not come with any of the security that you would expect docker to bring out of the box, instead you have to think of your application as a normal process running under the root user.

Luckily as this is intended for dashboard computers there should not be much of importance outside the container and the computer should be a single user (well no user really) environment, so running as `root` shouldn't be to big of a concern.

**Note:** I will be looking at ways to drop privileges for the actual `electron` process, so only the container startup phase uses root access, but until then everything WILL be running as root.
