// The entry file of your WebAssembly module.
import { Context} from "near-sdk-core"
import { Fact ,PartialFact} from "./model";
import { AccountId} from "./utils";

//near call $CONTRACT init '''{"""owner""":"""YOUR_ACCOUNT_ID.testnet"""}''' --accountId $CONTRACT
//logging.log() => printf
@nearBindgen
export class Contract {
  
  private  owner: AccountId
  
  constructor(owner: AccountId, allow_anonymous: bool = true) {
    this.owner = owner
  }
  //near call $CONTRACT create '''{"""info""":"""Earth Is Flat!!""","""reference""":"""Trust me bro"""}''' --accountId YOUR_ACCOUNT_ID.testnet
  create(info: string, reference: string): Fact {
    //you need to give 2 for post a new
    return Fact.insert(info,reference,Context.predecessor);
  }
  getById(id: u32): Fact {
    return Fact.findById(id);
  }

  //near call $CONTRACT getByRange '''{"""offset""":0,"""limit""":2}''' --accountId YOUR_ACCOUNT_ID.testnet
  getByRange(offset: u32, limit: u32 = 10): Fact[] {
    return Fact.find(offset, limit);
  }

  //near call $CONTRACT getVerified '''{"""offset""":0,"""limit""":2}''' --accountId YOUR_ACCOUNT_ID.testnet
  getVerified(offset: u32, limit: u32 = 10): Fact[] {
    //returns only verified news between a range of news
    return Fact.find(offset, limit).filter(x=>(x.hasChecked && x.isTrue));
  }

  //near call $CONTRACT verify '''{"""id""":SOME_ID_HERE}''' --accountId YOUR_ACCOUNT_ID.testnet
  verify(id: u32): Fact {
    // good new provider get 2+1
    this.auth();
    return Fact.verify(id);
  }
  //near call $CONTRACT deny '''{"""id""":SOME_ID_HERE}''' --accountId YOUR_ACCOUNT_ID.testnet
  deny(id: u32): Fact {
    //the bad news provider wont get his 2 back
      this.auth();
      return Fact.deny(id);
  }
  
  //near call $CONTRACT testAuth({}) --accountId YOUR_ACCOUNT_ID.testnet
  testAuth():string{
    this.auth();
    return "Authorized"
  }

  //near call $CONTRACT update '''{"""id""":SOME_ID_HERE, """updates""":{"""info""":"""SOMESTRING""", """reference""":"""SOMESTRING""","""isTrue""":false,"""hasChecked""":true} }''' --accountId YOUR_ACCOUNT_ID.testnet
  update(id: u32, updates: PartialFact): Fact {
    this.auth();
    return Fact.findByIdAndUpdate(id, updates);
  }

  //near call $CONTRACT delete '''{"""id""":SOME_ID_HERE}''' --accountId YOUR_ACCOUNT_ID.testnet
  delete(id: u32): void {
    this.auth();
    Fact.findByIdAndDelete(id);
  }
  //Its like a middleware, checks the caller
  private auth(): void {
    const caller = Context.sender;
    assert(this.owner == caller, "Not Authorized")
  }
}
