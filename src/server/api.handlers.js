const testSet1 = require('./testSet1.json');

function isValidFbResponse(fbResponse) {
  if (typeof fbResponse !== 'object')
    return false

  if (typeof fbResponse['userID'] !== 'string')
    return false
  if (typeof fbResponse['email'] !== 'string')
    return false
  if (typeof fbResponse['name'] !== 'string')
    return false

  return true;
}

function makeNewVote(items, fbResponse) {
  return {
    name: fbResponse.name,
    email: fbResponse.email,
    userID: fbResponse.userID,
    item1: items[0],
    item2: items[1],
    item3: items[2],
    location: 'dummy',
    created_at: new Date(),
    meta: {
      fbResponse: JSON.stringify(fbResponse)
    }
  }
}

function isValidItems(items) {
  let idsExist = true;
  items.forEach((itemId) => {
    let found = false;
    testSet1.forEach((project) => {
      if (itemId === project.id) {
        found = true;
      }
    });
    idsExist = idsExist && found // If this becomes false at any point, cannot become true again
  })
  return idsExist && items.length === 3;
}

const VoteTally = require('./models/VoteTally');
const Vote = require('./models/Vote');

function getValidBody(body) {
  let parsedBody = JSON.parse( body );
  if (isValidItems(parsedBody['items']) && isValidFbResponse(parsedBody['fbResponse'])) { // Validate body
    return parsedBody;
  }
}

function* getStats() {
  let allTallies = yield VoteTally.findAsync()
  let stats = {
    totals: {},
    share: {}
  }
  for(let i = 0; i < allTallies.length; i++ ) {
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
    let fbResponse = validBody['fbResponse']
    let user = yield Vote.findOneAsync({userID: fbResponse.userID})
    if(!user || this.reqCount < 10000) { // TODO prototype test hack NOT FOR PRODUCTION
      console.log(' *** User has not voted or less than 10000 requests. Will create new vote and update tallys: ', fbResponse.name, items)

      if(!user) {
        //TODO here we assume valid facebook user, but this is only guaranteed for requests made by the frontend (i.e. poll spamming is possible)
        let newVoteParams = makeNewVote(items, fbResponse)
        let newVote = new Vote(newVoteParams)
        yield newVote.saveAsync()
      }

      let t1 = yield VoteTally.findOneAsync({itemId: items[0]})
      let t2 = yield VoteTally.findOneAsync({itemId: items[1]})
      let t3 = yield VoteTally.findOneAsync({itemId: items[2]})
      yield VoteTally.findByIdAndUpdateAsync(t1._id, { $inc: { totalVotes: 1 }}, { 'new': true }),
      yield VoteTally.findByIdAndUpdateAsync(t2._id, { $inc: { totalVotes: 1 }}, { 'new': true }),
      yield VoteTally.findByIdAndUpdateAsync(t3._id, { $inc: { totalVotes: 1 }}, { 'new': true })

      yield VoteTally.updateShareOfVote(this.reqStr)
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
  let parsedBody = JSON.parse( this.body )
  let user = yield Vote.findOneAsync({userID: parsedBody['fbResponse'].userID})
  this.status = 404
  if (user) {
    this.status = 200
    let stats = yield getStats()
    this.body = {
      msg: 'Success',
      share: stats.share,
      totals: stats.totals,
      selectedItems: [user.item1, user.item2, user.item3]
    }
  }
}
