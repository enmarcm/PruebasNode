import PgHandler from '../../components/PgHandler.js'
import config from './config.js'
import querys from './querys.js'

const pgHandler = new PgHandler({ config, querys })

export default pgHandler