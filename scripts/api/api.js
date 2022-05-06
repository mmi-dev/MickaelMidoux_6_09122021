// eslint-disable-next-line no-unused-vars
class PhotographersApi {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this.url = url
  }

  async get() {
    return (
      fetch(this.url)
        .then((res) => res.json())
        // eslint-disable-next-line no-console
        .catch((err) => console.log('an error occurs', err))
    )
  }
}
