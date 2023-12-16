import { InjectionToken } from "@angular/core";

export const TWO_HOURS_IN_MILISECONDS =  2 * 60 * 60 * 1000;

export const CACHE_TTL = new InjectionToken<number>('configures cache time to live');