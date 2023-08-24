import { request, RequestDocument } from "graphql-request";

export { gql } from "graphql-request";

const API_ENDPOINT = "https://fe-test-server-7879-86f4b8c36d73.herokuapp.com/";

export const query = (query: RequestDocument) => request(API_ENDPOINT, query);
