import * as path from 'node:path';

export const absoluteRootPath = path.resolve(__dirname, '..', '..');

export const getPublicPath = () => path.join('public');
export const getAbsolutePublicPath = () => path.join(getPublicPath());
export const getReportPath = () => path.join(getPublicPath(), 'report');
export const getAbsoluteReportPath = () => path.join(getReportPath());
export const getChatMessagePath = () => path.join(getPublicPath(), 'chat-message');
export const getAbsoluteChatMessagePath = () => path.join(getChatMessagePath());