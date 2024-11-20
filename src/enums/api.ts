export enum ResponseStatus {
  /**
   * OK (200): Indicates that the request has succeeded.
   */
  OK = 200,
  /**
   * CREATED (201): Indicates that the POST request was successful.
   */
  CREATED = 201,
  /**
   * UNAUTHORIZED (401): Indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
   */
  UNAUTHORIZED = 401,

  /**
   * NOT_FOUND (404): Indicates that the server can't find the requested resource. Links which lead to a 404 page are often called broken or dead links.
   */
  NOT_FOUND = 404,

  /**
   * INTERNAL_SERVER_ERROR (500): Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR = 500,
}
