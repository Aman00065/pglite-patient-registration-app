// Replace Pglite with direct IndexedDB implementation
import { v4 as uuidv4 } from "uuid"
import type { Patient } from "./types"

// Database name and store
const DB_NAME = "patient_registration_db"
const DB_VERSION = 1
const PATIENT_STORE = "patients"

// Initialize the database
let dbPromise: Promise<IDBDatabase> | null = null

// Initialize the IndexedDB database
const initDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error("IndexedDB error:", event)
      reject("Could not open IndexedDB")
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object store for patients if it doesn't exist
      if (!db.objectStoreNames.contains(PATIENT_STORE)) {
        const store = db.createObjectStore(PATIENT_STORE, { keyPath: "id" })

        // Create indexes for searching
        store.createIndex("name", ["first_name", "last_name"], { multiEntry: false })
        store.createIndex("email", "email", { unique: false })
        store.createIndex("created_at", "created_at", { unique: false })
      }
    }
  })
}

// Get database connection
const getDb = async (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = initDb()
  }
  return dbPromise
}

// Execute a query-like operation on the database
export const executeQuery = async (query: string, params: any[] = []): Promise<{ rows: any[] }> => {
  const db = await getDb()
  const lowerQuery = query.toLowerCase().trim()

  // Handle different query types
  if (lowerQuery.startsWith("select")) {
    return handleSelect(db, query, params)
  } else if (lowerQuery.startsWith("insert")) {
    return handleInsert(db, query, params)
  } else {
    throw new Error("Only SELECT and INSERT queries are supported")
  }
}

// Handle SELECT queries
const handleSelect = async (db: IDBDatabase, query: string, params: any[]): Promise<{ rows: any[] }> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PATIENT_STORE], "readonly")
    const store = transaction.objectStore(PATIENT_STORE)
    const request = store.getAll()

    request.onsuccess = () => {
      let results = request.result

      // Very basic filtering based on query
      if (query.includes("where") && params.length > 0) {
        // This is a very simplified implementation
        // In a real app, you'd want to parse the SQL properly
        results = results.filter((item) => {
          // Simple filtering based on ID if that's in the query
          if (query.includes("id =") && params[0]) {
            return item.id === params[0]
          }
          return true
        })
      }

      // Handle ORDER BY (very simplified)
      if (query.includes("order by")) {
        if (query.includes("created_at desc")) {
          results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        }
      }

      // Handle LIMIT (very simplified)
      if (query.includes("limit") && params.length > 0) {
        const limitMatch = query.match(/limit\s+(\d+)/i)
        if (limitMatch && limitMatch[1]) {
          const limit = Number.parseInt(limitMatch[1], 10)
          results = results.slice(0, limit)
        }
      }

      resolve({ rows: results })
    }

    request.onerror = () => {
      reject(new Error("Error executing SELECT query"))
    }
  })
}

// Handle INSERT queries
const handleInsert = async (db: IDBDatabase, query: string, params: any[]): Promise<{ rows: any[] }> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PATIENT_STORE], "readwrite")
    const store = transaction.objectStore(PATIENT_STORE)

    // Create a new patient object
    const patient: Patient = {
      id: uuidv4(),
      first_name: params[0],
      last_name: params[1],
      date_of_birth: params[2],
      gender: params[3],
      email: params[4] || null,
      phone: params[5] || null,
      address: params[6] || null,
      medical_history: params[7] || null,
      created_at: params[8] || new Date().toISOString(),
    }

    const request = store.add(patient)

    request.onsuccess = () => {
      resolve({ rows: [patient] })
    }

    request.onerror = () => {
      reject(new Error("Error executing INSERT query"))
    }
  })
}

// Initialize the database and return the query function
export const initializeDb = async () => {
  await getDb()

  // Return an object with a query method to mimic Pglite's interface
  return {
    query: executeQuery,
  }
}
