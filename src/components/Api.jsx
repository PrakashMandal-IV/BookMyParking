import axios from "axios";

// export const Api='https://frenzi.bsite.net/MyPasswordVault/'
export const Api = 'https://localhost:7230/'


export async function NoAuthPost(config, callback, errorcallback) {

  const options = {
    method: 'POST',
    url: Api + config.link,
    headers: { 'Content-Type': 'application/json' },
    data: config.data
  };

  await axios.request(options)
    .then(res => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch(err => {

      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    })
}

export async function NoAuthGet(config, callback, errorcallback) {

  const options = {
    method: 'GET',
    url: Api + config.link,

  };

  await axios.request(options)
    .then(res => {
      //do something
      if (callback != null) {
        callback(res);
      }
    })
    .catch(err => {

      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    })
}


export async function Get(config, callback, errorcallback) {

  const options = {
    method: 'GET',
    url: Api + config.link,
    headers: {
      'Authorization': "bearer " + sessionStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };
  await axios.request(options)
    .then(res => {


      if (callback != null) {

        callback(res);
      }
    })
    .catch(error => {
      // catch error
      if (errorcallback != null) {
        errorcallback(error);
      }
    })
}

export async function Post(config, callback, errorcallback) {
  const options = {
    method: 'POST',
    url: Api + config.link,
    headers: {
      'Authorization': "bearer " + sessionStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: config.data
  };

  await axios.request(options)
    .then(res => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch(err => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    })
}


export const FileUpload = async (config, callback, errorcallback) => {
  
  const formData = new FormData();
  formData.append('file', config.file)
  const response = await fetch(Api + config.link,
    {
      method: 'POST',
      headers: {
        'Authorization': "bearer " + sessionStorage.getItem('token')
      },
      body: formData
    })

  if (response.ok) {
    callback(response.text());

  }else{
    errorcallback();
  }
}