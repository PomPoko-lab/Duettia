import { pb } from '$lib/pocketbase';
import type { RecordListQueryParams } from 'pocketbase';

/**
 * Pocketbase API docs:
 * https://pocketbase.io/docs/api-records/
 *
 * This is a base class for all models to extend from.
 * It provides a set of common methods for interacting with the Pocketbase API.
 * */
export default abstract class BaseModel {
	abstract collection: string;

	async createRecord(values: object) {
		return await pb.collection(this.collection).create(values);
	}

	async getOneRecord(recordID: string) {
		return await pb.collection(this.collection).getOne(recordID);
	}

	async getListRecord(page: number, pageSize: number, queryParams: RecordListQueryParams) {
		return await pb.collection(this.collection).getList(page, pageSize, queryParams);
	}

	async getFullListOfRecords(queryParams: RecordListQueryParams) {
		return await pb.collection(this.collection).getFullList(queryParams);
	}

	async getFirstRecord(filter: string, queryParams: RecordListQueryParams) {
		return await pb.collection(this.collection).getFirstListItem(filter, queryParams);
	}

	async updateRecord(recordID: string, values: object) {
		return await pb.collection(this.collection).update(recordID, values);
	}

	async deleteRecord(recordID: string, doHardDelete = false) {
		if (doHardDelete) {
			return await pb.collection(this.collection).delete(recordID);
		}

		return await pb.collection(this.collection).update(recordID, {
			active: false
		});
	}
}
