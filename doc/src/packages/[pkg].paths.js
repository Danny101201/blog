export default {
  paths() {
    return [
      { params: { pkg: 'foo' } },
      { params: { pkg: 'bar' } }
    ]
  },
  title: 'My Awesome Site',
  titleTemplate: ':title - Custom Suffix'

}