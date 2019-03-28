const filters = {
  eclipse: (str = '', len = 50) => {
    if (str.length > Number(len)) {
      return str.slice(0, Number(len)) + '...'
    } else {
      return str
    }
  }
}

export default filters
