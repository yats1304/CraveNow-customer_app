import { BaseEntity } from "./common.types";

export interface Banner extends BaseEntity {
  title: string;
  image: string;
  redirectUrl?: string;
}
