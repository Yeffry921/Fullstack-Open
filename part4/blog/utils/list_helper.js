const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return curr.likes += acc
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}