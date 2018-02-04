class Api {
  constructor() {
    this.user = { id: 1, name: 'test'}
    this.friends = [ this.user, this.user, this.user]
    this.photo = 'not a real photo'
  }

  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user)
      }, 200);
    })
  }

  getFriends() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.friends.slice())
      }, 200);
    })
  }

  getPhoto(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.photo)
      }, 200);
    })
  }

  throwError() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Intentional Error'))
      }, 200);
    })
  }
}

// test one
function callbackHell() {
  const api = new Api()
  let user, friends
  api.getUser().then(function (returnedUser) {
    user = returnedUser
    api.getFriends(user.id).then(function (returnedFriends) {
      friends = returnedFriends
      api.throwError().then(function () {
        console.log('Error was not thrown');
        api.getPhoto(user.id).then(function (photo) {
          console.log('callbackHell', {user, friends, photo});
        }, function (err) {
          console.error(err);
        })
      }, function (err) {
        console.error(err);
      })
    }, function (err) {
      console.error(err);
    })
  }, function (err) {
    console.error(err);
  })
}

// callbackHell()

// test two
function promiseChain(params) {
  const api = new Api()
  let user, friends
  api.getUser()
    .then(returnedUser => {
      user = returnedUser
      return api.getFriends(user.id)
    })
    .then(returnedFriends => {
      friends = returnedFriends
      return api.getPhoto(user.id)
    })
    .then(() => {
      console.log('Error was not thrown');
      return api.getPhoto(user.id)
    })
    .then(photo => {
      console.log('promiseChain', {user, friends, photo});
    })
    .catch(err => {
      console.error(err);
    })
}

// promiseChain()

// test three

async function asyncAwaitIsYourNewBestFriend() {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)
  const photo = await api.getPhoto(user.id)
  console.log('asyncAwaitIsYourNewBestFriend', {user, friends, photo});
}

// asyncAwaitIsYourNewBestFriend()

// test four

async function asyncAwaitTryCatch() {
  try {
    const api = new Api()
    const user = await api.getUser()
    const friends = await api.getFriends(user.id)

    await api.throwError()
    console.log('Error was not thrown');
    
    const photo = await api.getPhoto(user.id)
    console.log('async/await', {user, friends, photo});
  } catch (error) {
    console.error(error);
  }
}

// asyncAwaitTryCatch()

// test five

function promiseLoops() {
  const api = new Api()
  api.getUser()
    .then(user => {
      return api.getFriends(user.id)
    })
    .then(returnedFriends => {
      const getFriendsOfFriends = friends => {
        if (friends.length > 0) {
          let friend = friends.pop()
          return api.getFriends(friend.id)
            .then(moreFriends => {
              console.log('promiseLoops', moreFriends);
              return getFriendsOfFriends(friends)
            })
        }
      }
      return getFriendsOfFriends(returnedFriends)
    })
}

// promiseLoops()

// test six

async function asyncAwaitLoops() {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)

  for (let friend of friends) {
    let moreFriends = await api.getFriends(friend.id)
    console.log('asyncAwaitLoops', moreFriends);
  }
}

// asyncAwaitLoops()

// test seven

async function asyncAwaitLoopsParallel() {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)
  const friendPromises = friends.map(friend => api.getFriends(friend.id))
  const moreFriends = await Promise.all(friendPromises)
  console.log('asyncAwaitLoopsParallel', moreFriends);
}

// asyncAwaitLoopsParallel()

// test eight

async function getUserInfo(params) {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)  
  const photo = await api.getPhoto(user.id)

  return {user, friends, photo}
}

function promiseUserInfo() {
  getUserInfo().then(({user, friends, photo}) => {
    console.log('promiseUserInfo', {user, friends, photo});
  })
}

async function awaitUserInfo() {
  const { user, friends, photo } = await getUserInfo()
  console.log('awaitUserInfo', {user,friends,photo});
}

// promiseUserInfo()
// awaitUserInfo()

async function getLotsOfUserData() {
  const users = []
  while (users.length < 10) {
    users.push(await getUserInfo())
  }
  console.log('getLotsOfUserData', users);
}

// getLotsOfUserData()

async function getLotsOfUserDataFaster() {
  try {
    const userPromises = Array(10).fill(getUserInfo())
    const users = await Promise.all(userPromises)
    console.log('getLotsOfUserDataFaster', users);
  } catch (error) {
    console.error(error);
  }
}

getLotsOfUserDataFaster()