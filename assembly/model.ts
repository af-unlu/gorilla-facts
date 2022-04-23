// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";
import { AccountId} from "./utils";

export const Facts = new PersistentUnorderedMap<u32, Fact>("facts");
// PartialFact class
@nearBindgen
export class PartialFact {
    info: string;
    reference: string;
    isTrue: bool;
    hasChecked: bool;
}

@nearBindgen
export class Fact {
    id: u32;
    info: string;
    reference: string;
    isTrue: bool;
    hasChecked: bool;
    postedBy: AccountId;
    constructor(info: string, reference: string, postedBy: AccountId) {
        this.id = math.hash32<string>(info);
        this.info = info;
        this.reference = reference;
        this.isTrue = false;
        this.hasChecked = false;
        this.postedBy = postedBy;
    }
    //CRUD Operation Statics
    //Create
    static insert(info: string, reference: string, postedBy: AccountId): Fact {
        //Creates a new fact
        const fact = new Fact(info, reference, postedBy);
        //The Fact has been saved to UnorderedMap
        //Simple Logic as SQL
        Facts.set(fact.id, fact);
        return fact;
    }

    //Read
    static findById(id: u32): Fact {
        return Facts.getSome(id);
    }
    //Read as a List
    static find(offset: u32, limit: u32): Fact[] {
        return Facts.values(offset, offset + limit);
    }
    //Updates
    //Here we use another dummy class to prevent inheritance errors
    static findByIdAndUpdate(id: u32, partial: PartialFact): Fact {
        // find a fact by its id
        const fact = this.findById(id);

        // update the fact in-memory
        fact.info = partial.info;
        fact.reference = partial.reference;
        fact.isTrue = partial.isTrue;
        fact.hasChecked = partial.hasChecked;

        Facts.set(id, fact);

        return fact;
    }

    static verify(id: u32): Fact {
        const fact = this.findById(id);
        fact.isTrue = true;
        fact.hasChecked =true;
        Facts.set(id, fact);
        return fact;
    }
    
    static deny(id: u32): Fact {
        const fact = this.findById(id);
        fact.isTrue = false;
        fact.hasChecked =true;
        Facts.set(id, fact);
        return fact;
    }

    static findByIdAndDelete(id: u32): void {
        Facts.delete(id);
    }

}