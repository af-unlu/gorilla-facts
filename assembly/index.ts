// The entry file of your WebAssembly module.
import { Context} from "near-sdk-core"
import { Fact ,PartialFact} from "./model";
import { AccountId} from "./utils";



@nearBindgen
export class Contract {
  
  private owner: AccountId
  
  constructor(owner: AccountId, allow_anonymous: bool = true) {
    this.owner = owner
  }

  create(info: string, reference: string): Fact {
    return Fact.insert(info,reference,Context.predecessor);
  }
  getById(id: u32): Fact {
    return Fact.findById(id);
  }
  get(offset: u32, limit: u32 = 10): Fact[] {
    return Fact.find(offset, limit);
  }

  verify(id: u32): Fact {
    this.assert_owner();
    return Fact.verify(id);
  }

  deny(id: u32): Fact {
    this.assert_owner();
    return Fact.deny(id);
  }

  del(id: u32): void {
    Fact.findByIdAndDelete(id);
  }
  //Its like a middleware, checks the caller
  private assert_owner(): void {
    const caller = Context.predecessor
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