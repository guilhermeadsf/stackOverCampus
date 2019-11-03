import axios from 'axios';

export const addPost = post => {
  return dispatch => {
    axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-stackovercampus-8a3f6.cloudfunctions.net/',
      method: 'post',
      data: {
        image: post.image.base64
      }
    })
      .catch(err => console.log(err))
      .then(res => {
        delete post.image;
        post.imageUrl = res.data.imageUrl;
        axios
          .post('https://stackovercampus.herokuapp.com/createPost', {
            ...post
          })
          .catch(err => console.log(err))
          .then(res => console.log(res.data));
      });
  };
};

export const creatingPost = () => {
  return {
    type: CREATING_POST
  };
};

export const postCreated = () => {
  return {
    type: POST_CREATED
  };
};
