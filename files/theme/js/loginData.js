
const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('signInBtn')
const ShowPasswordCheck = document.querySelector('.ShowPassword');
const PasswordText = document.querySelector('.PasswordText');

console.log(button);

// const sendLoginEmail = async () => {
//   const data = {
//     email: email.value,
//   };
//   fetch('https://tonexbackend.onrender.com/api/loginemailsand', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response=> response.json())
//     .then(response => {
//       console.log(response);
//       const id = localStorage?.getItem('userId')
//         window.location = `https://bitpaynexus-dashboard.vercel.app/#/${id}`;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

button.onclick = async (event) => {
  event.preventDefault();

  const data = {
    email: email.value,
    password: password.value,
  };

  console.log(data);
  button.innerHTML = "Loading...";

  fetch('https://tonex-backend.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.json())
    .then(response => {
      localStorage.setItem('userId', response?._id)
      console.log(response)
      const userId = localStorage?.getItem('userId')
      console.log("Local User Id", userId);
      if (response.message === 'User have not been verified'){
        window.location = `https://bitpaynexus-dashboard.vercel.app/`;
        console.log("object");
        return
      }if (response._id === '' || response._id === undefined){
        alert('Please enter your valid credentials');
        button.innerHTML = "Sign In";
        return
      }else{
        const id = localStorage?.getItem('userId')
        window.location = `https://bitpaynexus-dashboard.vercel.app/#/${id}`;
        // sendLoginEmail()
        console.log("object2");
        //  console.log(userId)
      }
    })  
    .catch((error) => {
      console.log(error);
      button.innerHTML = "Sign In";
    });
};


ShowPasswordCheck.onclick = ()=>{
  if(ShowPasswordCheck.checked === true){
    password.type = "text"
    PasswordText.innerHTML = "Hide Passwoord"
  }else{
    password.type = "password"
    PasswordText.innerHTML = "Show Password"
  }
}