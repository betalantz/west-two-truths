const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  console.log('hit upload')
  if (event.httpMethod !== 'POST'){
    return { statusCode: 405, body: JSON.stringify({ message: "POST OR BUST!"})} 
  }

  try {
    console.log('Uploading submission')
    const { name, truth1, truth2, lie } = JSON.parse(event.body)

    const submission = { data: {
      name, truth1, truth2, lie, shown: false
    }}
    console.log(submission)

    const req = await fauna.query(q.Create(q.Ref("classes/submissions"), submission))

    return { statusCode: 200, body: JSON.stringify({ message: 'Yay submitted!' })}
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}
