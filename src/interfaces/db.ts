import mongoose from 'mongoose';

export interface dbArgs {
  uri: string;
  options: mongoose.ConnectOptions | undefined;
}
