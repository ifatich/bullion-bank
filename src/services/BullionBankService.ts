import BullionBankInstance from '@/services/BullionBankInstance'
import api, { type TParamsLogin } from '@/services/api'

class BullionBankService extends BullionBankInstance {
  login(request: TParamsLogin) {
    return this.axios(api.login(request))
  }
}

export default new BullionBankService()
