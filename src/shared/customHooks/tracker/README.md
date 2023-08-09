# Tracker

## `useIsUserActive`

Contains a custom hook that returns a boolean value indicating whether the user is active or not.

It uses the `useEffect` to add event listeners for `visibilitychange` event on document.

Example usage:

```js
// import the hook
import useIsUserActive from '@/shared/customHooks/tracker/useIsUserActive.hook';

// use the hook
const { isUserActive } = useIsUserActive({
  isUserActive: true, // provide optional initial value
});

// this hook sends the following data to server
const payload = {
  "isUserActive": boolean,
  "ip": string,
  "browser": string,
  "browserVersion": string,
  "vendor": string,
  "language": string,
  "languages": string[],
  "platform": string,
  "cookiesEnabled": boolean,
  "doNotTrack": any,
  "userAgent": string,
  "screen": {
    "availHeight": number,
    "availLeft": number,
    "availTop": number,
    "availWidth": number,
    "colorDepth": number,
    "height": number,
    "isExtended": boolean,
    "orientation": object,
    "pixelDepth": number,
    "width": number,
    "ScreenOrientation": {
      "angle": number,
      "type": string
    }
  },
  "timezoneOffset": number,
  "timezone": string,
  "localStorage": boolean,
  "battery": {
    "charging": boolean,
    "chargingTime": number,
    "dischargingTime": number,
    "level": number
  },
  "bluetooth": boolean
}
```

it also updates isUserActive state in redux `store.tracking` slice.
