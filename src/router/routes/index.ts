import { Route } from '../type.d';

const modules = import.meta.globEager('./modules/*.tsx');
const appRoutes: Route[] = [];

Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default as Route;
  if (!defaultModule) return;
  const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
  appRoutes.push(...moduleList);
});

export default appRoutes;
