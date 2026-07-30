export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAsset {
  url: string;
  publicId?: string;
}
