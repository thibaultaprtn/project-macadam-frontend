//Route pour être vérifier que le token correspond bien à un token d'un admin

// async function handleAdmin(event) {
//     // event.preventDefault();
//     try {
//       if (Cookies.get("token")) {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKURL}/user/validadmin`,
//           {
//             headers: {
//               token: `${Cookies.get("token")}`,
//             },
//           }
//         );
//         // console.log("log testing", response.data);
//         // setUsername(response.data.username);
//       }
//     } catch (error) {
//       // console.log("on a une erreur");
//       console.log(error.response.data);
//       alert(error.response.data.message);
//     }
//   }
