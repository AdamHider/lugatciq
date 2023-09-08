export class ApiService {
  baseUrl = "/";

  constructor(config){
    Object.assign(this, config);
  }
  setResource = (context, method) =>  {
    context = context.charAt(0).toUpperCase() + context.slice(1);
    return this.baseUrl+`${context}/${method}`;
  }
  setHeaders = (context, method) =>  {
    let headers = {
        "Content-Type": "application/json"
    };
    if(method == 'uploadItem') headers = {}
    if(localStorage['x-sid']) headers['x-sid'] = localStorage['x-sid'];
    return headers;
  }

  post = async(context, method, params = {}) =>  {
    var self = this;
    let responseData = {};
    const resource = this.setResource(context, method);
    const headers = this.setHeaders(context, method);
    let data = JSON.stringify(params);
    if(method == 'uploadItem') data = params
    await fetch(resource, {
        method: 'POST', // or 'PUT'
        credentials: 'include',
        headers: headers,
        body: data,
        })
        .then((response) => {
            if(response.headers.get('x-sid')){
                localStorage.setItem('x-sid', response.headers.get('x-sid'))
            }
            return response.json()
        })
        .then((data) => {
            responseData = data;
        })
        .catch((error) => {
            responseData = error;
        });
    return responseData;
  }
}


export class Api extends ApiService{
    wordform = {
        getItem: (params) => {
            return this.post('wordform', 'getItem', params)
        },
        getList: (params) => {
            return this.post('wordform', 'getList', params)
        },
        getTotalRows: (params) => {
            return this.post('wordform', 'getTotalRows', params)
        }
    }
    quest = {
        getItem: (params) => {
            return this.post('quest', 'getItem', params)
        },
        getList: (params) => {
            return this.post('quest', 'getList', params)
        },
        claimReward: (params) => {
            return this.post('quest', 'claimReward', params)
        },
        createItem: (params) =>  {
            return this.post('quest', 'createItem', params)
        },
        saveItem: (params) =>  {
            return this.post('quest', 'saveItem', params)
        },
        getAvailableLessons: (params) => {
          return this.post('quest', 'getAvailableLessons', params)
        },
        calculateReward: (params) => {
          return this.post('quest', 'calculateReward', params)
        },
        getAvailableCodes: (params) => {
          return this.post('quest', 'getAvailableCodes', params)
        }

    }
    homework = {
        getItem: (params) => {
            return this.post('homework', 'getItem', params)
        },
        getList: (params) => {
            return this.post('homework', 'getList', params)
        }
    }
    course = {
        getList: (params) => {
            return this.post('course', 'getList', params)
        },
        getItem: (params) => {
            return this.post('course', 'getItem', params)
        }
    }
    lesson = {
        getItem: (params) => {
            return this.post('lesson', 'getItem', params)
        },
        getList: (params) => {
            return this.post('lesson', 'getList', params)
        },
        getSatellites: (params) => {
            return this.post('lesson', 'getSatellites', params)
        },
        getPage: (params) => {
            return this.post('lesson', 'getPage', params)
        }
    }
    exercise = {
        addItem: (params) => {
            return this.post('exercise', 'addItem', params)
        },
        redoItem: (params) => {
            return this.post('exercise', 'redoItem', params)
        },
        saveAnswer: (params) => {
            return this.post('exercise', 'saveAnswer', params)
        },
        getLeaderboard: (params) => {
            return this.post('exercise', 'getLeaderboard', params)
        }
    }
    notifications = {
        getList: (params) => {
            return this.post('notification', 'getList', params)
        }
    }
    user = {
        getItem: (params) =>  {
            return this.post('user', 'getItem', params)
        },
        saveItem: (params) => {
            return this.post('user', 'saveItem', params)
        },
        saveItemSettings: (params) => {
            return this.post('user', 'saveItemSettings', params)
        },
        savePassword: (params) => {
            return this.post('user', 'saveItemPassword', params)
        },
        signUp: (params) =>  {
            return this.post('user', 'signUp', params)
        },
        signOut: async (params) =>  {
            const result = await this.post('user', 'signOut', params);
            localStorage.removeItem('x-sid')
            return result
        },
        signIn: (params) => {
            return this.post('user', 'signIn', params);
        },
        checkUsername: (params) => {
            return this.post('user', 'checkUsername', params);
        },
        checkEmail: (params) => {
            return this.post('user', 'checkEmail', params);
        }
    }
    classroom = {
        subscribe: (params) =>  {
            return this.post('classroom', 'subscribe', params)
        },
        unsubscribe: (params) =>  {
            return this.post('classroom', 'unsubscribe', params)
        },
        getItem: (params) =>  {
            return this.post('classroom', 'getItem', params)
        },
        getList: (params) =>  {
            return this.post('classroom', 'getList', params)
        },
        createItem: () =>  {
            return this.post('classroom', 'createItem', {})
        },
        saveItem: (params) =>  {
            return this.post('classroom', 'saveItem', params)
        },
        checkIfExists: (params) =>  {
            return this.post('classroom', 'checkIfExists', params)
        },
        getSubscriberList: (params) =>  {
            return this.post('classroom', 'getSubscribers', params)
        },
        getFeed: (params) =>  {
            return this.post('classroom', 'getFeed', params)
        }


    }
    image = {
        upload: (params) =>  {
          return this.post('image', 'uploadItem', params)
        }
    }
}
