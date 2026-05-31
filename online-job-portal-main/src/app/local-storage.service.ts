import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Save data (automatically serializes objects/arrays)
  setItem(key: string, value: any): void {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  // Retrieve data (automatically parses objects/arrays)
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T; // Fallback if data is a plain string
    }
  }

  // Remove single item
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all storage for the origin
  clear(): void {
    localStorage.clear();
  }
}