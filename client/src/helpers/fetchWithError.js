export default async function fetchWithError(url, options) {
  const response = await fetch(url, options);

  const results = await response.json();
  // Allows 300 codes too, won't throw error messages attached to 200 responses

  if (response.status === 401) {
    throw ["Unauthorised"];
  } else if (response.status >= 400) {
    throw results.errors || ["An error has occurred"];
  }
  return results;
}
