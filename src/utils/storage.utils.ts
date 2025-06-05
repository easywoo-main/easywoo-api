import * as path from 'node:path';

export const getPublicPath = () => path.join('public');
export const getReportPath = () => path.join(getPublicPath(), 'report');
export const getChatMessagePath = () => path.join(getPublicPath(), 'chat-message');
