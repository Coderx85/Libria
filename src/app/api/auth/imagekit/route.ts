import config from '@/lib/config';
import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  }
} = config

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint })

export type ImageKitResponse = {
  token: string;
  signature: string;
  expire: number;
}

export async function GET():Promise<NextResponse<ImageKitResponse>> {
  return NextResponse.json(imagekit.getAuthenticationParameters())
}