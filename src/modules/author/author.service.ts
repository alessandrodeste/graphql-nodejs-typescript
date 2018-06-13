import axios from 'axios';
import { API_ENDPOINT } from '../../constants';

export class AuthorService {
  public createAuthor({name, age}, token: string) {
    const url = `${API_ENDPOINT}/author`;
    const requestBody = { name, age };
    const headers = { Authorization: `Token ${token}` };

    return axios.post(url, requestBody, { headers })
      .then((res) => {
        if (res.data && res.data.author) {
          return res.data.author;
        }
        throw new Error('Error');
      });
  }
}