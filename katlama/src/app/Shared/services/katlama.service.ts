import { Injectable } from '@angular/core';
import { Katlama } from '../models/katlama';
import Arweave from 'arweave/web';
import { JWKInterface } from 'arweave/web/lib/wallet';
import Transaction from 'arweave/web/lib/transaction';
import { environment } from '../../../environments/environment';
import { WithId } from '../models/with-id';

@Injectable({
  providedIn: 'root',
})
export class KatlamaService {
  constructor(private arweaveClient: Arweave) {}

  async getKatlamaIds(profileId?: string): Promise<string[]> {
    const appQueryCondition = {
      op: 'and',
      expr1: {
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'App-Name',
          expr2: environment.appName,
        },
        expr2: {
          op: 'equals',
          expr1: 'App-Version',
          expr2: environment.appVersion,
        },
      },
      expr2: {
        op: 'equals',
        expr1: 'Type',
        expr2: 'katlama',
      },
    };

    return this.arweaveClient.arql(
      profileId
        ? {
            op: 'and',
            expr1: {
              op: 'equals',
              expr1: 'from',
              expr2: profileId,
            },
            expr2: appQueryCondition,
          }
        : appQueryCondition,
    );
  }

  async getKatlama(katlamaId: string): Promise<Katlama & WithId> {
    const katlamaTransaction = await this.arweaveClient.transactions.get(katlamaId);

    const katlama = JSON.parse(atob(katlamaTransaction.data.toString()));// todo  error?

    return {
      id: katlamaTransaction.id,
      ...katlama,
    };
  }

  async publishKatlama(
    katlama: Partial<Katlama>,
    katlamaImgFile: File,
    key: JWKInterface,
  ): Promise<string> {
    let imgTransaction = await this.arweaveClient.createTransaction(
      {
        data: await this.fileToUintArray(katlamaImgFile),
      },
      key,
    );

    imgTransaction.addTag('Content-Type', katlamaImgFile.type);
    imgTransaction.addTag('Type', 'katlama-img');

    await this.arweaveClient.transactions.sign(imgTransaction, key);
    await this.arweaveClient.transactions.post(imgTransaction);

    katlama.imageId = imgTransaction.id;

    let katlamaTransaction = await this.arweaveClient.createTransaction(
      {
        data: JSON.stringify(katlama),
      },
      key,
    );

    this.addTransactionAppTags(katlamaTransaction);
    katlamaTransaction.addTag('Content-Type', 'application/json');
    katlamaTransaction.addTag('Type', 'katlama');

    await this.arweaveClient.transactions.sign(katlamaTransaction, key);
    await this.arweaveClient.transactions.post(katlamaTransaction);

    return katlamaTransaction.id;
  }

  async getKatlamaPublishStatus(katlamaId: string): Promise<boolean> {
    const statusRes = await this.arweaveClient.transactions.getStatus(katlamaId);
    return statusRes.status === 200;
  }

  private addTransactionAppTags(transaction: Transaction): void {
    transaction.addTag('App-Name', environment.appName);
    transaction.addTag('App-Version', environment.appVersion);
    transaction.addTag('Unix-Time', Date.now().toString());
  }

  private fileToUintArray(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (e) => {
        resolve(new Uint8Array(e.target.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
