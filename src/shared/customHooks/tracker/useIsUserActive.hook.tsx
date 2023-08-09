import { placeholderApi } from '@/api/axios-instance';
import { useEffect, useState } from 'react';
import {
  userIsActive,
  userIsInactive,
} from '@/store/modules/tracking/tracking.slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/store/modules/auth/auth.slice';

export interface IsUserActiveType {
  isUserActive: boolean;
}

export interface UseIsUserActivePropsType {
  isUserActive?: boolean;
}

/*
 * @v1.1 tracks route and url
 * @author @mubashirjamali101
 * @since 07/27/2023
 * @description This hook tracks that user is actively using app and updates sends that data to server, i.e. tab is in focus and browser app is also in focus.
 * @description This hook also tracks user's browser details and IP address.
 * @returns {isUserActive} boolean
 * */
export default function useIsUserActive(
  props: UseIsUserActivePropsType = { isUserActive: true },
): IsUserActiveType {
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);
  const [isUserActive, setIsUserActive] = useState(props.isUserActive);

  async function getUserData() {
    const profile = await placeholderApi.get('/getUserProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return profile.data;
  }

  const handleVisibilityChange = async () => {
    const isUserActive = document.hidden;

    if (isUserActive) {
      setIsUserActive(false);
      dispatch(userIsInactive());
    } else {
      setIsUserActive(true);
      dispatch(userIsActive());
    }

    const userProfile = await getUserData();
    const email = userProfile?.email;
    const _id = userProfile?._id;

    await updateRemoteUserActiveStatus({ isUserActive }, token, email, _id);
  };

  useEffect(() => {
    handleVisibilityChange();
  }, [token]);

  useEffect(() => {
    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
      false,
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
        false,
      );
    };
  }, []);

  return { isUserActive } as IsUserActiveType;
}

/*
 * @author @mubashirjamali101
 * @since 07/27/2023
 * @description This function updates user active status on server and database.
 * @returns {isUserActive} boolean
 * */
const updateRemoteUserActiveStatus = async (
  status: IsUserActiveType,
  token: string,
  email: string,
  _id: string,
) => {
  const ipResp = await fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const data = {
    isUserActive: status.isUserActive,
    email,
    userId: _id,
    ip: ipResp?.ip,
    ...(await getBrowserDetails()),
  };

  await placeholderApi.post('/userActivity', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/*
 * @author @mubashirjamali101
 * @since 07/29/2023
 * @description This function gets user's browser details.
 * @returns {browserDetails} {
 * browser: string,
 * browserVersion: string,
 * vendor: string,
 * language: string,
 * languages: string[],
 * platform: string,
 * cookiesEnabled: boolean,
 * doNotTrack: string,
 * userAgent: string,
 * screen: object,
 * timezoneOffset: number,
 * timezone: string,
 * localStorage: boolean,
 * battery: object,
 * bluetooth: boolean }
 * */
const getBrowserDetails = async () => {
  const display = {
    displayAvailHeight: screen.availHeight,
    displayAvailLeft: screen?.availLeft,
    displayAvailTop: screen?.availTop,
    displayAvailWidth: screen.availWidth,
    displayColorDepth: screen.colorDepth,
    displayHeight: screen.height,
    displayIsExtended: screen?.isExtended,
    displayOrientation: screen.orientation,
    displayPixelDepth: screen.pixelDepth,
    displayWidth: screen.width,
    ScreenOrientationAngle: screen.orientation.angle,
    ScreenOrientationType: screen.orientation.type,
  };

  const battery = await navigator?.getBattery();

  const bluetooth = await navigator?.bluetooth.getAvailability();

  return {
    browser: navigator?.appName,
    browserVersion: navigator?.appVersion,

    vendor: navigator?.vendor,

    language: navigator?.language,

    languages: navigator?.languages,

    platform: navigator?.platform,

    cookiesEnabled: navigator?.cookieEnabled,

    doNotTrack: navigator?.doNotTrack,

    userAgent: navigator?.userAgent,

    ...display,

    timezoneOffset: new Date().getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    localStorage: !!window.localStorage,

    batteryCharging: battery.charging,
    batteryChargingTime: battery.chargingTime,
    batteryDischargingTime: battery.dischargingTime,
    batteryLevel: battery.level,

    bluetooth,

    route: window.location.pathname,
    url: window.location.href,
  };
};
