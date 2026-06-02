import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  // Use environment files to store secret keys safely
  private readonly secretKey = '06b009f9d518df62e9786a49713c39e661356b4bdbc187b93cb13f561bae984184b7d638665ec93136c8dbe1d012ce2d6e3f7644c9b24b6ed473d99ef72066bd5f5c9094e98976c96fb8b875dacdf212b6683c872301a144b3dd07c475459c8ac7345857b7d54a58a6784c3178ff16f451e17d5d2ad0c3e9fca891436051ff52'; 

  constructor() {}

  // Encrypt token/data before storage or transmission
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  // Decrypt token/data back to original text
  decrypt(textToDecrypt: string): string {
    const bytes = CryptoJS.AES.decrypt(textToDecrypt, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}