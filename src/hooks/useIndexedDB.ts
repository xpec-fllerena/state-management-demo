const DB_NAME = "state-db";
const DB_VERSION = 1;
const OBJECT_STORE_NAME = "state";

const useIndexedDB = () => {

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          const objectStore = db.createObjectStore(OBJECT_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          objectStore.createIndex("key", "key", { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error opening database");
    });
  };

  const closeDB = (db: any) => {
    db.close();
  };

  const addRecord = (db: any, record: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const request = objectStore.add(record);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error adding record");
    });
  };

  const getRecord = (db: any, id: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(OBJECT_STORE_NAME, "readonly");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const request = objectStore.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error getting record");
    });
  };

  const getAllRecords = (db: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(OBJECT_STORE_NAME, "readonly");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const request = objectStore.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error getting all records");
    });
  };

  const updateRecord = (db: any, id: any, newData: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const request = objectStore.put({ ...newData, id });

      request.onsuccess = () => resolve(request);
      request.onerror = () => reject("Error updating record");
    });
  };

  const deleteRecord = (db: any, id: any) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const request = objectStore.delete(id);

      request.onsuccess = () => resolve(request);
      request.onerror = () => reject("Error deleting record");
    });
  };

  return {
    openDB,
    closeDB,
    addRecord,
    getRecord,
    getAllRecords,
    updateRecord,
    deleteRecord
  };
};

export default useIndexedDB;
