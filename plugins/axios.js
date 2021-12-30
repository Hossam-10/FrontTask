export default ({ $axios, app: { $cookies } }) => {
  $axios.onRequest((config) => {
    const authToken = $cookies.get("authenticationToken");
    let headers = {};
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    config.headers.common = {
      ...config.headers.common,
      ...headers,
    };
  });
};
