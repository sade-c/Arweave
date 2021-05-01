import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import Arweave from 'arweave/web';
 
import { JWKInterface } from 'arweave/web/lib/wallet';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(public arweaveClient: Arweave) {}

  getProfileIdFromKey(key: JWKInterface): Promise<string> {
    return this.arweaveClient.wallets.jwkToAddress(key);
  }
  getProfiles(key): Promise<string> {
    return this.arweaveClient.wallets.jwkToAddress(key);
  }
 
}
