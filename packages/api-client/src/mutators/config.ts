let apiBaseUrl = ""

export function setApiBaseUrl(url: string) {
  apiBaseUrl = url
}

export function getApiBaseUrl() {
  if (!apiBaseUrl) {
    throw new Error(
      "API base URL is not set. Please call setApiBaseUrl(url) before making API requests."
    )
  }
  return apiBaseUrl
}
