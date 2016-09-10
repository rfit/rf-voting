const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Promise = require('bluebird'); //ADD THIS LINE
Promise.promisifyAll(mongoose); //AND THIS LINE

const testSet1 = require('./../testSet1.json');

const VoteTallySchema = new Schema({
  itemId: { type: String, required: true, unique: true },
  totalVotes: { type: Number, required: true, default: 0 },
  shareOfVotes : { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


VoteTallySchema.statics.updateShareOfVote = function * updateShareOfVote(reqStr) {
  let allTallies = yield VoteTally.findAsync()

  let total = 0
  let shareSum = 0
  for(let i = 0; i < allTallies.length; i++) {
    total += allTallies[i].totalVotes
  }
  for(let i = 0; i < allTallies.length; i++) {
    let id = allTallies[i]._id
    let projectShare = allTallies[i].totalVotes
    let share = projectShare / total
    shareSum += share
    yield VoteTally.findByIdAndUpdateAsync(id, { $set: { shareOfVotes: share }}, { 'new': true })
  }
  console.log('*** Updated share of vote. Sum of shares: ', shareSum, ' Total votes:', total)
}

VoteTallySchema.statics.initializeTallies = function* () {
  let voteTalliesCreated = 0
  for (let i = 0; i < testSet1.length; i++) {
    let project = testSet1[i]
    let existingVoteTally = yield VoteTally.findOneAsync({itemId: project.id})
    if (!existingVoteTally) {
      let newVoteTally = new VoteTally({
        itemId: project.id
      })
      yield newVoteTally.saveAsync()
      voteTalliesCreated += 1
    }
  }
  if (voteTalliesCreated > 0) {
    console.log('*** Created ' + voteTalliesCreated + ' voteTallies that did not exists at app start')
  } else {
    console.log('*** All necessary voteTallies exist, no data change during initialization')
  }
}


VoteTallySchema.statics.allTalliesExist = function* () {
  let voteTalliesMissing = false
  console.log(new Date().toString())
  for (let i = 0; i < testSet1.length; i++) {
    let project = testSet1[i]
    let existingVoteTally = yield VoteTally.findOneAsync({itemId: project.id}) // TODO Use collection of ids from testSet1?
    if (!existingVoteTally) {
      voteTalliesMissing = true
    }
  }
  console.log(new Date().toString())
  yield voteTalliesMissing
}

let VoteTally = mongoose.model('VoteTally', VoteTallySchema);

module.exports = VoteTally;
