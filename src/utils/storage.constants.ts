export const userAvatarPath = (userId: string) => `users/${userId}/avatar`;
export const courseDefaultImagePath = () => `courses/default`;
export const getFileLocation = (bucket_name: string, region: string, filePath: string) =>
  `https://${bucket_name}.s3.${region}.amazonaws.com/${filePath}`
