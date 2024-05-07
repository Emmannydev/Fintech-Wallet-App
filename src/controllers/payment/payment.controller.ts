import axios from "axios";
import { Request, Response } from "express";
import { httpAuth } from "../../utils/auth/authUtil";
import crypto from "crypto-js";

class PaymentController {

  // Get all channel
  getChannels = async (req: Request, res: Response) => {
    const path: string = "/business/channels";
    const method: string = "GET";
    const headerAuth = httpAuth(path, method, false);

    console.log("the authorization header", headerAuth);
    const options = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/channels",
      headers: { ...headerAuth, accept: "application/json" },
    };

    try {
      const response = await axios.request(options);
      console.log("Response data from the call", response.data);
      res.status(200).send(response.data)
    } catch (error) {
      console.error("Error making the call", error);
    }

  };

  getCollectionsData =async (req:Request,res:Response)=>{

    const channelsAuth = httpAuth('/business/channels', 'GET', false);
    const networksAuth = httpAuth('/business/networks', 'GET', false);

    const optionsChannel = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/channels",
      headers: { ...channelsAuth, accept: "application/json" },
    };




    const optionsNet = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/networks",
      headers: { ...networksAuth, accept: "application/json" },
    };

    const channelData = await axios.request(optionsChannel);
    const networkData = await axios.request(optionsNet);

    let {channels, networks} = {...networkData.data, ...channelData.data} as any

    let activeChannels = channels.filter((c:any) => c.status === 'active')
  // let supportedCountries = [...new Set(activeChannels.map(c => c.country))]

  // Select channel
  let channel = activeChannels[1]
  let supportedNetworks = networks.filter((n:any) => n.status === 'active' && n.channelIds.includes(channel.id));
  let network = supportedNetworks[0]

  const amount = 50

  const recipient ={
    name: 'John Doe',
    country: 'Nigeria',
    phone: '+2349092916898',
    address: 'Home Address',
    dob: '02/01/1997',
    email: 'john.doe@yellowcard.io',
    idNumber: '314159',
    idType: 'license'
  }

  const source = {
    accountNumber: "0690000040",
    accountType: network.accountNumberType,
    networkId: network.id,
  }

  let request = {
    channelId: channel.id,
    currency: channel.currency,
    country: channel.country,
    forceAccept: false,
    sequenceId: new Date().toISOString(),
    amount,
    source,
    recipient
  }

console.log("the reuestttttt",request)

return res.status(200).send(request)
  }


  // make collection controller
  makeCollection = async(req:Request,res:Response)=>{

  const headerAuth = httpAuth('/business/collections', 'POST', req.body);


  // console.log("the authorization header", headerAuth);
  const options = {
    method: "POST",
    url: "https://sandbox.api.yellowcard.io/business/collections",
    headers: { ...headerAuth, accept: "application/json" },
    data: req.body
  };

  try {
    const response = await axios.request(options)
    return res.status(200).send(response.data)
  } catch (_error) {
    const error = _error as {
      response: {
        data: {
          code: string,
          message: string
        }
      }
    }
    console.log("the error",error)
  }
  }

// accept collection request controller
acceptCollectionRequest = async(req:Request,res:Response)=>{

  console.log("the request body",req.params.id)

  const path = `/business/collections/${req.params.id}/accept`
  const method = "POST"

  const headerAuth = httpAuth(path, method, false);

  console.log("the authorization header", headerAuth);
  const options = {
    method: "POST",
    url: `https://sandbox.api.yellowcard.io/business/collections/${req.params.id}/accept`,
    headers: { ...headerAuth, accept: "application/json" },
  };


  try {
    const acceptResponse = await axios.request(options)
    console.log("the accept", acceptResponse)
    res.status(200).send(acceptResponse.data)
  } catch (_error) {
    const error = _error as {
      response: {
        data: {
          code: string,
          message: string
        }
      }
    }
    console.log("the error",error.response.data)
  }
}


lookedUpCollectionBySequenceId = async(req:Request,res:Response)=>{

  console.log("the look request body",req.params.id)

  const path = `/business/collections/sequence-id/${req.params.id}`
  const method = "GET"

  const headerAuth = httpAuth(path, method, false);

  console.log("the authorization header", headerAuth);
  const options = {
    method: "GET",
    url: `https://sandbox.api.yellowcard.io/business/collections/sequence-id/${req.params.id}`,
    headers: { ...headerAuth, accept: "application/json" },
  };

  try {
    const response = await axios.request(options)
    console.log("the look up", response)
  } catch (_error) {
    const error = _error as {
      response: {
        data: {
          code: string,
          message: string
        }
      }
    }
    console.log("the error",error.response.data)
  }

}


// Make payment controller

  makePayment = async (req: Request, res: Response) => {

    const body = req.body
    const path: string = "/business/payments";
    const method: string = "POST";
    const channelsAuth = httpAuth('/business/channels', 'GET', false);
    const networksAuth = httpAuth('/business/networks', 'GET', false);
    const ratesAuth = httpAuth('/business/rates', 'GET', false);

    const optionsChannel = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/channels",
      headers: { ...channelsAuth, accept: "application/json" },
    };
    const optionsNet = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/networks",
      headers: { ...networksAuth, accept: "application/json" },
    };
    const optionRate = {
      method: "GET",
      url: "https://sandbox.api.yellowcard.io/business/rates",
      headers: { ...ratesAuth, accept: "application/json" },
    };

    const channelData = await axios.request(optionsChannel);
    const networkData = await axios.request(optionsNet);
    const ratesData = await axios.request(optionRate);


    let {channels, networks, rates} = {...networkData.data, ...channelData.data, ...ratesData.data} as any

    let activeChannels = channels.filter((c:any) => c.status === 'active')
    let supportedCountries = [...new Set(activeChannels.map((c:any) => c.country))]
  
    // Select channel
    let channel = activeChannels[1]
    let supportedNetworks = networks.filter((n:any) => n.status === 'active' && n.channelIds.includes(channel.id));
    let network = supportedNetworks[0]
   
    const currency = rates.filter((r:any) => r.code === 'NGN')

    const amountLocal = 500
  const amountUSD = amountLocal * currency[0].buy
  
  const reason = 'entertainment'
  const sequenceId = '97f7c7f2-f7bb-450c-8f6d-1b26d-5645s'
 
  const sender = {
    name: 'John Doe',
      country: 'United States',
      phone: '+1293019990',
      address: '20019 Giantlane Or.',
      dob: '19/10/2002',
      email: 'john.doe@yellowcard.io',
      idNumber: '12345',
      idType: 'license'
  }

  const destination:Record<string,any> = {
    accountType: 'momo',
      accountName: "Ken Adams",  
      accountNumber: "+2341111111111",  
      networkId: "5f1af11b-305f-4420-8fce-65ed2725a409"

  }



  // const accAuth = httpAuth('/business/details', "POST", destination);
  // const optionsAcc = {
  //   method: "POST",
  //   url: `https://sandbox.api.yellowcard.io/business/details/${network.accountNumberType}`,   //business/details/bank
  //   headers: { ...accAuth, accept: "application/json" },
  //   data:destination
  // };
  // console.log("the account auth",optionsAcc)
  // let {data: destinationConf} = await axios.request(optionsAcc)
  // destination.accountName = "Json bourne"
  // let forceAccept = true

  let request = {
    channelId: channel.id,
    currency: channel.currency,
    country: channel.country,
    amountUSD,
    sequenceId,
    reason,
    destination,
    sender
  }

  console.log("the final request",request)
  const headerAuth = httpAuth(path, method, request);


    console.log("the authorization header", headerAuth);
    const options = {
      method: "POST",
      url: "https://sandbox.api.yellowcard.io/business/payments",
      headers: { ...headerAuth, accept: "application/json" },
      data: request
    };


    try {
      const res = await axios.request(options)
      console.log("the res", res)
    } catch (_error) {
      const error = _error as {
        response: {
          data: {
            code: string,
            message: string
          }
        }


      }
      // console.log("the error",error.response.data)
    }
  }
};

export const PaymentControllers = new PaymentController();
