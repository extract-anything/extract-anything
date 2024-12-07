import Cookies from "js-cookie"

export const acceptedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
  "application/zip",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]

export const Storage = {
  getItem: (key: string) => Cookies.get(key) || null,
  setItem: (key: string, value: string) => Cookies.set(key, value),
  removeItem: (key: string) => Cookies.remove(key),
} as typeof localStorage
