// The entry file of your WebAssembly module.
import { Context} from "near-sdk-core"
import { Fact ,PartialFact} from "./model";
import { AccountId} from "./utils";

//near call $CONTRACT init '''{"""owner""":"""afy.testnet"""}''' --accountId $CONTRACT
//logging.log() => printf
@nearBindgen
export class Contract {
  
  private  owner: AccountId
  
  constructor(owner: AccountId, allow_anonymous: bool = true) {
    this.owner = owner
  }
  //near call $CONTRACT create '''{"""info""":"""Earth Is Flat!!""","""reference""":"""Trust me bro"""}'''
  create(info: string, reference: string): Fact {
    //you need to give 2 for post a new
    return Fact.insert(info,reference,Context.predecessor);
  }
  getById(id: u32): Fact {
    return Fact.findById(id);
  }

  //near call $CONTRACT get '''{"""offset""":0,"""limit""":2}''' --accountId afy.testnet
  get(offset: u32, limit: u32 = 10): Fact[] {
    return Fact.find(offset, limit);
  }
  //near call $CONTRACT verify '''{"""id""":2303316000}''' --accountId afy.testnet
  verify(id: u32): Fact {
    // good new provider get 2+1
    this.auth();
    return Fact.verify(id);
  }
  //near call $CONTRACT deny '''{"""id""":2303316000}''' --accountId afy.testnet
  deny(id: u32): Fact {
    //the bad news provider wont get his 2 back
      this.auth();
      return Fact.deny(id);
  }
  //
  getOwner():string{
    return this.owner.toString();
  }

  //near call $CONTRACT testAuth({}) --accountId afy.testnet
  testAuth():string{
    this.auth();
    return "Authorized"
  }

  update(id: u32, updates: PartialFact): Fact {
    return Fact.findByIdAndUpdate(id, updates);
  }

  del(id: u32): void {
    Fact.findByIdAndDelete(id);
  }
  //Its like a middleware, checks the caller
  private auth(): void {
    const caller = Context.sender;
    assert(this.owner == caller, "Only the owner of this contract may call this method")
  }
}

/*
export function create(info: string, reference: string, postedBy: AccountId): Fact {
  return Fact.insert(info,reference,postedBy);
}

export function getById(id: u32): Fact {
  return Fact.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Fact[] {
  return Fact.find(offset, limit);
}

export function update(id: u32, updates: PartialFact): Fact {
  return Fact.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
  Fact.findByIdAndDelete(id);
}
*/