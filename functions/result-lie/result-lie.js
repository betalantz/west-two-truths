const faunadb = require('faunadb')
const fauna = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'PATCH'){
    return { statusCode: 405, body: JSON.stringify({ message: "PATCH IT UP!"})} 
  }

  try {
    console.log('Setting result')
    const { result, id } = JSON.parse(event.body)
    const updated = { correctLie: result }
    const req = await fauna.query(q.Update(q.Ref(`classes/submissions/${id}`), {data: updated}))

    const reqUpdated = await fauna.query(q.Map(q.Paginate(q.Match(q.Index("all_submissions"))), q.Lambda("attr", q.Get(q.Var("attr")))))

    const allSubmissions = reqUpdated.data 

    const shown = allSubmissions.filter(s => !!s.data.shown)
    const correctNames = shown.filter(s => !!s.data.correctName)
    const correctLies = shown.filter(s => !!s.data.correctLie)

    const overview = {
      totalCorrectNames: correctNames.length,
      totalCorrectLies: correctLies.length,
      totalShown: shown.length
    }

    return { statusCode: 200, body: JSON.stringify(overview)}
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}
