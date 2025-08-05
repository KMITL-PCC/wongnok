import {RedisStore} from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import express from "express"


const app = express();
// Initialize client.
let redisClient = createClient({url: process.env.REDIS_URL})
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
  }),
)

app.listen(3000, () => {
    console.log('app runnig on port :', 3000)
})