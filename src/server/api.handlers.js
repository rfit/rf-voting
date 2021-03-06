const { sprintf } = require("sprintf-js")

const projectSet = require('./projects.json')

function isValidFbResponse(fbResponse) {
  if (typeof fbResponse !== 'object')
    return false

  return typeof fbResponse['userID'] === 'string'
}

function isValidItems(items) {
  return projectSet.some(project => project.id === items[0])
  /*   let itemIdsExist = items.every((itemId) => {
      return projectSet.some((project) => project.id === itemId)
    })
    return itemIdsExist && items.length === 3 */
}

const VoteTally = require('./models/VoteTally')
const Vote = require('./models/Vote')

let testUser1Body = {
  items: [
    projectSet[0].id,
    projectSet[1].id,
    projectSet[2].id
  ],
  fbResponse: {
    name: 'votingUser1',
    email: 'votingUser1@rfit.dk',
    userID: 'votingUserUserId'
  }
}
function getValidBody(body) {
  let parsedBody = JSON.parse(body)
  console.log("Parsed body", parsedBody.items)
  let bodyIsValid = isValidItems(parsedBody['items']) && isValidFbResponse(parsedBody['fbResponse'])
  console.log("Is valid ", isValidItems(parsedBody['items']))
  console.log("Is valid ", isValidFbResponse(parsedBody['fbResponse']))

  if (bodyIsValid)
    return parsedBody

  if (require('config').get('allowMultipleVotes')) {
    console.log(sprintf('*** Using test user for body.fbResponse instead of that parsed. [allowMultipleVotes: %s]', require('config').get('allowMultipleVotes')))
    if (isValidItems(parsedBody['items'])) {
      parsedBody.fbResponse = testUser1Body.fbResponse
      return parsedBody
    }
    return testUser1Body
  }
}

function makeNewVote(items, fbResponse) {
  return {
    userID: fbResponse.userID,
    /*     item1: items[0],
        item2: items[1],
        item3: items[2], */
    item: items[0],
    location: 'dummy',
    created_at: new Date(),
    meta: {
      fbResponse: JSON.stringify(fbResponse)
    }
  }
}

function* getStats() {
  let allTallies = yield VoteTally.findAsync()
  let stats = {
    totals: {},
    share: {}
  }
  for (let i = 0; i < allTallies.length; i++) {
    let t = allTallies[i]
    stats.totals[t.itemId] = t.totalVotes
    stats.share[t.itemId] = t.shareOfVotes
  }
  return stats
}

module.exports.voteHandler = function* () {
  let validBody = getValidBody(this.body)
  if (validBody) {
    let items = validBody['items']
    console.log(items)
    let fbResponse = validBody['fbResponse']
    let user = yield Vote.findOneAsync({ userID: fbResponse.userID })
    if (!user) {
      // Here we assume valid facebook user, but this is only guaranteed for requests made by the frontend (i.e. poll spamming is possible by supplying new unique user info)
      let newVoteParams = makeNewVote(items, fbResponse)
      let newVote = new Vote(newVoteParams)
      yield newVote.saveAsync()
    }

    if (!user || require('config').get('allowMultipleVotes')) { // TODO document
      console.log(sprintf('*** Will vote as %s and update update tallys on %s [allowMultipleVotes: %s]', fbResponse.name, items, require('config').get('allowMultipleVotes')))
      let t1 = yield VoteTally.findOneAsync({ itemId: items[0] })
      /*       let t2 = yield VoteTally.findOneAsync({ itemId: items[1] })
            let t3 = yield VoteTally.findOneAsync({ itemId: items[2] }) */
      yield VoteTally.findByIdAndUpdateAsync(t1._id, { $inc: { totalVotes: 1 } }, { 'new': true }),
        /*       yield VoteTally.findByIdAndUpdateAsync(t2._id, { $inc: { totalVotes: 1 } }, { 'new': true }),
              yield VoteTally.findByIdAndUpdateAsync(t3._id, { $inc: { totalVotes: 1 } }, { 'new': true }) */

        yield VoteTally.updateShareOfVote()
    }

    let stats = yield getStats()
    this.body = {
      msg: 'Success',
      share: stats.share,
      totals: stats.totals
    }

  } else { // Invalid body request
    this.status = 400
    console.log('*** Request made with invalid body', this.body, this.request)
    this.body = {
      msg: 'Error'
    }
  }
}

module.exports.loginHandler = function* () {
  console.log(this.body)
  let parsedBody = JSON.parse(this.body)
  let user = yield Vote.findOneAsync({ userID: parsedBody['fbResponse'].userID })
  this.status = 404

  if (user) {
    this.status = 200
    let stats = yield getStats()
    this.body = {
      msg: 'Success',
      share: stats.share,
      totals: stats.totals,
      /* selectedItems: [user.item1, user.item2, user.item3] */
      selectedItems: [user.item]
    }
  }
}
