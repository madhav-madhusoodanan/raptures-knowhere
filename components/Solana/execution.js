import idl from "./idl.json";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

//Wallet, instantiating contract
class Executor {
  //Bring idl

  async getProfile() {
    //read the cid
  }
  async putProfile(cid) {
    //update the cid
  }
}

export default Executor;
