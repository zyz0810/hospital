import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const IdKey = 'id';
export function getId() {
  return Cookies.get(IdKey)
}

export function setId(token) {
  return Cookies.set(IdKey, token)
}

export function removeId() {
  return Cookies.remove(IdKey)
}

const NameKey = 'name';
export function getName() {
  return Cookies.get(NameKey)
}

export function setName(token) {
  return Cookies.set(NameKey, token)
}

export function removeName() {
  return Cookies.remove(NameKey)
}
