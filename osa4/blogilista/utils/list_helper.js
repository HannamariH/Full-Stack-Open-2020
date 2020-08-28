const dummy = (blogs) => {
    return 1
  }

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        const likes = item.likes
        return sum + likes
    }
    return array.reduce(reducer, 0)
}
  
  module.exports = {
    dummy,
    totalLikes
  }