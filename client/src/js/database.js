// Import the 'openDB' function from the 'idb' library
import { openDB } from 'idb';

// Define a function to initialize the database
const initdb = async () => {
  // Open the 'jate' database with version 1
  await openDB('jate', 1, {
    // Define an upgrade function that runs if the database version changes
    upgrade(db) {
      // Check if the 'jate' object store already exists in the database
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // If it doesn't exist, create a new 'jate' object store with an auto-incrementing ID key path
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true,
      });
      console.log('jate database created');
    },
  });
};

// Define a function to add data to the 'jate' object store
export const putDb = async (content) => {
  // Open the 'jate' database
  const jateDB = await openDB('jate', 1);
  // Start a readwrite transaction on the 'jate' object store
  const tx = jateDB.transaction('jate', 'readwrite');
  // Get the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Add a new object with an auto-incrementing ID and the provided content to the 'jate' object store
  const request = store.put({ id: 1, value: content });
  // Wait for the operation to complete and log the result to the console
  const result = await request;
  console.log(result);
};

// Define a function to retrieve data from the 'jate' object store
export const getDb = async (e) => {
  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);
  // Start a readonly transaction on the 'jate' object store
  const tx = jateDb.transaction('jate', 'readonly');
  // Get the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Get the object with ID 1 from the 'jate' object store
  const request = store.get(1);
  // Wait for the operation to complete and return the value of the object (or undefined if not found)
  const result = await request;
  return result?.value;
};

// Call the 'initdb' function to initialize the database when this module is imported
initdb();
