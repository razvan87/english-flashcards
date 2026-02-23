export function parseJwt(token) {
    try {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload);
      return JSON.parse(payload);
    } catch (err) {
      return null;
    }
  }

  export function getToken() {
    return localStorage.getItem("token");
  }
  
  export function setToken(token) {
    localStorage.setItem("token", token);
  }
  
  export function removeToken() {
    localStorage.removeItem("token");
  }  