// custom/login

/**
 * This will be called when the server is started.
 *
 * It should return the constructor for the authentication provider.
 *
 * @param {object} deps - The dependencies passed from the running server
 *                        to this implementation.
 * @param {function} deps.BaseAuthProvider - the base class to use
 * @param {object} deps.problem - a set of exceptions to throw on failure
 * @param {object} deps.models - the models of the admin-Realm
 * @returns {function}
 */
module.exports = function(deps) {
  return class CustomAuthProvider extends deps.BaseAuthProvider {

    // return name of this custom authentication provider
    static get name() {
      return 'custom/login';
    }

    // ensure required default options are set (optional function)
    static get defaultOptions() {
      return {
        server: 'http://127.0.0.1:3000',
      }
    }

    constructor(name, options, requestPromise) {
      super(name, options, requestPromise);

      this.httpMethod = 'GET';
    }

    // perform the authentication verification
    verifyIdentifier(req) {
      // The token submitted by the client
      const token = req.body.data;
      // options for the HTTP request
      const httpOptions = {
        uri: `${this.options.server}/users/name/?token=${token}`,
        method: this.httpMethod,
        json: true,
      };
      
        // make request to external provider and return result
      return this.request(httpOptions)
        .catch((err) => {
          // Please see src/node/services/problem/http_problem.js
          // for other error cases
          console.log(err)
          throw new deps.problem.HttpProblem.Unauthorized({
            detail: `Something bad happened: ${err.toString()}`,
          });
        })
        .then((result) => {
          // assume user ID value is in the `userId` JSON key returned
          return result.data;
      });
    }
  };
}