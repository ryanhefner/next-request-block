// TypeScript Version: 3.0

import { Component } from 'react';
import { RequestBlockCache } from 'react-request-block';

/**
 * initRequestBlockCache
 */

export interface initRequestBlockCacheParams {
  initialState: any;
}

export function initRequestBlockCache(params: initRequestBlockCacheParams): RequestBlockCache;

/**
 * withRequestBlock
 */

export interface withRequestBlockParams {
  accessToken: string;
  host: string;
  space: string;
}

export type withRequestBlock = (params: withRequestBlockParams) => Component;
