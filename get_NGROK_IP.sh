#!/bin/sh

nohup ngrok http 3000 --log=stdout > /dev/null
curl --silent --show-error http://127.0.0.1:4040/api/tunnels | sed -nE 's/.*public_url":"([^"]*).*/\1/p'