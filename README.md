# ODH Weather Component
The web component for the Open Data Hub created during the 2024 Bootcamp
## Index

- [Features](#features)
- [Usage](#usage)
- [Options](#options)

## Features

- Dynamic map and data loading
- Near webcams search
- Live Weather Data
- 3 hours gap forecast
- Day by day forecast
- Component attributes options
- Dark and light mode support

## Usage

1. Import the web component into your page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
+   <script src="https://weather.syswhite.dev/weather-component.js" />
    <title>ODH Weather Component</title>
  </head>
  <body>

  </body>
</html>
```

2. Use the web component

```html
<div style="height: 100dvh; width: 100dvw">
  <weather-component
    starting-position="[46.4892643, 11.3265582]"
    enable-big-popup="true"
    enable-big-popup-takefullviewport="true"
    enable-webcams-page="true"
  />
</div>
```

<b>NOTE</b>: Make sure the parent has a set height and width, otherwise you won't be able to see the component

## Options

- enable-webcams-page -> boolean, make the webcams page accessible
- starting-position -> array, set the map's starting position
- enable-big-popup -> boolean, enable the "More Info" popup
- enable-bg-popup-takefullviewport -> boolean, Make the popup take the full viewport
