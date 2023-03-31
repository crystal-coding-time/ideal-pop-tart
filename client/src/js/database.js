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

// Define a function to add content to the 'jate' database
export const putDb = async (content) => {
  // Initialize the 'jate' database
  const db = await initdb();
  // Create a transaction in 'readwrite' mode
  const tx = db.transaction('jate', 'readwrite');
  // Retrieve the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Add the content to the 'jate' object store using the 'put' method
  await store.put(content);
  // Wait for the transaction to complete
  await tx.done;
};

// Define a function to get all the content from the 'jate' database
export const getDb = async () => {
  // Initialize the 'jate' database
  const db = await initdb();
  // Create a transaction in 'readonly' mode
  const tx = db.transaction('jate', 'readonly');
  // Retrieve the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Get all the content from the 'jate' object store using the 'getAll' method
  const result = await store.getAll();
  // Wait for the transaction to complete
  await tx.done;
  // Return the result of the 'getAll' method
  return result;
};
  
  initdb();
