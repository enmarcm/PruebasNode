import PgHandler from '../../components/PgHandler.js'
import importJson from '../../utils/importJson.js'

const config = importJson({ path: '../data/pg-handler-data/config.json' })
const querys = importJson({ path: '../data/pg-handler-data/querys.json' })

const pgHandler = new PgHandler({ config, querys })

export default pgHandler