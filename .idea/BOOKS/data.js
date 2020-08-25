const appId = '887EF53C-1C2F-F87C-FFDB-F5DA02692800';
const apiKey = '5FB7755F-82B9-4F5C-801B-51AE43E4D34C';

function host(endpoint){
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}


export async function getBooks(){
    const response = await fetch(host('books'));
    const data = await response.json();
    return data;
    // return (await (await fetch(host('books'))).json());
}
// function getBooks(){
//     return fetch(host('books')).then(res=>res.json());
// }

export async function createBook(book){
    const response = await fetch(host('books'),{
        method:'POST',
        body: JSON.stringify(book),
        headers: {'Content-Type':'application/json'}
    })
    const data = await response.json();
    return data;
}

export async function updateBook(book){
    const id = book.objectId;
    const response = await fetch(host('books/'+id),{
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {'Content-Type':'application/json'}
    })
    const data = await response.json();
    return data;
}

async function deleteBook(id){
   const resposne = await fetch(host('books/'+id),{
       method:'DELETE'
   })
    const data = await resposne.json();
   return data;
}