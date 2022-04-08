class Api {
    constructor({ baseUrl, headers }) {
      this.headers = headers;
      this.baseUrl = baseUrl;
    }
  
    getProfile() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log())
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log())
    }

    editProfile(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log())
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name,
                link
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log())
    }

    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
   }

    deleteLike(id) {
      return fetch(`${this.baseUrl}/cards/${id}/Likes`, {
          method: "DELETE",
          headers: this.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

    addLike(id) {
      return fetch(`${this.baseUrl}/cards/${id}/Likes`, {
          method: "PUT",
          headers: this.headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
    }

    editAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this.headers,
          body: JSON.stringify({
            avatar
          })
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log('Ошибка. Запрос не выполнен'))
    } 

} 
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: 'fdb704ba-0bbd-4733-b11d-72b3d08c51f5',
      'Content-Type': 'application/json'
    }
  }); 