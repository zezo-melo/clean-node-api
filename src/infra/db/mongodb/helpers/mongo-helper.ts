import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri)
    },

    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    },

    getCollection(name: string): Collection {
      return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectionWithoutId } = collection
        return Object.assign({}, collectionWithoutId, { id: _id })
    }
}