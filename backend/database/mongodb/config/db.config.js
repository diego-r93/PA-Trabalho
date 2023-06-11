const username = 'diego'
const password = 'D1993rS*'
const clusterName = 'tomatoes.wsuvd'
const databaseName = 'user-:ID'

module.exports = {
    url: `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`
}