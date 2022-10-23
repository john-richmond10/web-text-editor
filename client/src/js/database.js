import { request } from 'express';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content, thisId) => {
  thisId = parseInt(thisId);
  let recrord = (thisId === 0) ? {content} : {id: thisId, content};
  const db = await openDB('jate');
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put(record);
  const result = await request;
  console.log('putDb result', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate');
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = await store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
