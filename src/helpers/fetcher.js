import axios from 'axios';
import app from '../app';

const baseURL = 'http://' + app.get('host') + ':' + app.get('port');

export default axios.create({
  baseURL,
  timeout: 2000
});
