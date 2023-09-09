export class LocalStorage {
  static get = (key: string) => {
    if (typeof window === "undefined") return;

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  };

  static set = (key: string, value: any) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  };

  static remove = (key: string) => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(key);
  };
}

export const tokenKey = "burger-builder-token";

export class ExpirySession {
  static get = (key: string) => {
    let stringValue: string = LocalStorage.get(key); // get details about token.
    if (!!stringValue) {
      let value = JSON.parse(stringValue);
      let expirationDate = new Date(value.expirationDate);
      if (expirationDate > new Date()) {
        this.set(key, value.value);
        return value.value;
      } else {
        LocalStorage.remove(key); // remove token if expired.
      }
    }
    return null;
  };

  static set = (
    key: string,
    value: any,
    expirationInSeconds: number = 1800
  ) => {
    let expirationDate = new Date(
      new Date().getTime() + 1000 * expirationInSeconds
    ); // create new expiring date.
    let newValue = {
      value,
      expirationDate: expirationDate.toISOString()
    };
    LocalStorage.set(key, JSON.stringify(newValue)); // add token to local storage.
  };

  static clear = () => {
    LocalStorage.remove(tokenKey);
  };
}

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

export const isFieldsInvalid = (obj: object) => {
  let returnValue = false;

  Object.values(obj).map((el: any) => {
    if (isEmpty(el)) return (returnValue = true);
  });

  return returnValue;
};
