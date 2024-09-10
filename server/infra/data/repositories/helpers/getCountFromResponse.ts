interface IGetCountFromResponse {
  count: number;
}

export function getCountFromResponse(response: IGetCountFromResponse[]) {
  return response[0]?.count ?? 0;
}
