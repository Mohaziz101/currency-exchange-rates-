const STORAGE_KEYS = {
  FAVORITE_EXCHANGES: "FAVORITE_EXCHANGES",
}

function getStorageItem(key) {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {

    return value;
  }
}

function setStorageItem(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue)
}