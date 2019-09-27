# slackbot
Basic Slack Bot - serves the Giphy API as well as Open Weather API

## Setup:
1. Clone the repo
2. npm install the required libraries
3. Create tunnel to local host using ngrok.io
4. Log Into or Create Slack server
5. Create new slack app
6. Create slash command, and route it to the ngrok url
* Example: https://ff0c2718.ngrok.io/weather - serves Palo Alto weather
* Eample 2: https://ff0c2718.ngrok.io/ - currenty serves giphy api
7. Start ngrok locally
8. Test ngrok by navigating to the base url in your browser. If working, you should see "Server is reachable.".
9. Start slackbot server with 'node index'
10. Test a slash command in Slack: '/weather'

## Sample Weather Response:
YourAppNameHere 3:07 PM

Current weather conditions for Palo Alto, CA:

Temperature: 70.34

Temp Range: 59 - 80.01

Humidity: 87

Atmospheric Pressure: 1013 hPa
