import {MongoClient} from 'mongodb'


export const client = new MongoClient('mongodb://localhost:12341');
export const db = client.db();
