import ApiMpetro from './ApiMpetro'

export default {
  organizationList () {
    return ApiMpetro().get('map/organizationList')
  },
  getPoints (search) {
    return ApiMpetro().get('getPoints', {
      params: { search }
    })
  }
}
