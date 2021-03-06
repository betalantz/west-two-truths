const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'PATCH'){
    return { statusCode: 405, body: JSON.stringify({ message: "PATCH IT UP!"})} 
  }

  try {
    console.log('Revealing name')
    const { id } = JSON.parse(event.body)
    const updated = { shown: true }
    const req = await fauna.query(q.Update(q.Ref(`classes/submissions/${id}`), {data: updated}))

    return { statusCode: 200, body: JSON.stringify({ message: 'Successfully updated' })}
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}
