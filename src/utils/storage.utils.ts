import * as path from 'node:path';

const absolutePath = path.resolve(__dirname, '..', '..');

export const getPublicPath = () => path.join('public');
export const getAbsolutePublicPath = () => path.join(absolutePath, getPublicPath());
export const getReportPath = () => path.join(getPublicPath(), 'report');
export const getAbsoluteReportPath = () => path.join(absolutePath,  getReportPath());
