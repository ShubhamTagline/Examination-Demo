import axios from "axios";

export const reuseApi = (requestMethod, baseurl, body,header) => {
 
  return axios({
    method: requestMethod,
    url: `${process.env.REACT_APP_SERVER_URL}${baseurl}`,
    data: body,
    headers:header
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
 
};
