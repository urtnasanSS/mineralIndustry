export default ({ env }) => {
  // console.log(env, '------------------env')
  import(`~/envConfigHelper/${env.NODE_ENV}.js`).then(c => c.default())
}
