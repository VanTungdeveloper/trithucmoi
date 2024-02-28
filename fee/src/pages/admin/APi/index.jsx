// export const getRecentOrders = () => {
//     fetch('https://dummyjson.com/carts/1')
//     .then(res => res.json());
// }


// async function getCategory(credentials: any) {
//     return fetch('http://localhost:3000/category', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

export const getProduct = () => {
    return fetch('https://dummyjson.com/products')
    .then(res => res.json());
};   

// export const getUser = () => {
//     return fetch('https://dummyjson.com/users')
//     .then(res => res.json())
// };