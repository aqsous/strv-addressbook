import { Request } from 'express';
import {UserDocument} from "../models/user.model";

interface CustomRequest extends Request {
  locals?: any
  user?: any
}

export default CustomRequest;
