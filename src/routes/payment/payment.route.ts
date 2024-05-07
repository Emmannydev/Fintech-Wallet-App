import  express  from "express"
import { PaymentControllers } from "../../controllers/payment/payment.controller"

 export const paymentRouter = express.Router()

const {getChannels,makeCollection,makePayment,acceptCollectionRequest,lookedUpCollectionBySequenceId,getCollectionsData} = PaymentControllers

paymentRouter.get("/channels",getChannels)
paymentRouter.post("/payment",makePayment)
paymentRouter.post("/collections",makeCollection)
paymentRouter.post("/collections/:id/accept",acceptCollectionRequest)
paymentRouter.get("/collections/sequence-id/:id",lookedUpCollectionBySequenceId)
paymentRouter.get("/collections/data",getCollectionsData)